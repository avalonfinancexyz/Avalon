import { task } from "hardhat/config";
import {
  ConfigNames,
  eNetwork,
  getReserveAddresses,
  loadPoolConfig,
  POOL_ADDRESSES_PROVIDER_ID,
  getChainlinkOracles,
  getPairsTokenAggregator,
} from "../../helpers";
import {
  AaveOracle,
  PoolAddressesProvider,
  PriceOracle__factory,
} from "../../typechain";
import { MARKET_NAME } from "../../helpers/env";
import {
  FALLBACK_ORACLE_ID,
  ORACLE_ID,
  TESTNET_REWARD_TOKEN_PREFIX,
} from "../../helpers/deploy-ids";

import { waitForTx } from "../../helpers/utilities/tx";

import { getAddress } from "@ethersproject/address";

task(`update-oracle`, `update oracle`).setAction(async (_, hre) => {
  const network = (
    process.env.FORK ? process.env.FORK : hre.network.name
  ) as eNetwork;
  const { deployer } = await hre.getNamedAccounts();

  const addressesProviderArtifact = await hre.deployments.get(
    POOL_ADDRESSES_PROVIDER_ID
  );
  const addressesProviderInstance = (
    await hre.ethers.getContractAt(
      addressesProviderArtifact.abi,
      addressesProviderArtifact.address
    )
  ).connect(await hre.ethers.getSigner(deployer)) as PoolAddressesProvider;

  const poolConfig = loadPoolConfig(MARKET_NAME as ConfigNames);
  const reserveAssets = await getReserveAddresses(poolConfig, network);
  const chainlinkAggregators = await getChainlinkOracles(poolConfig, network);

  const [assets, sources] = getPairsTokenAggregator(
    reserveAssets,
    chainlinkAggregators
  );

  const aaveOracleArtifact = await hre.deployments.get(ORACLE_ID);
  const aaveOracleInstance = (await hre.ethers.getContractAt(
    aaveOracleArtifact.abi,
    aaveOracleArtifact.address
  )) as AaveOracle;
  // 1. Set price oracle

  const aclAdmin = await hre.ethers.getSigner(
    await addressesProviderInstance.getACLAdmin()
  );
  const isAdmin = aclAdmin.address == deployer;

  if (isAdmin) {
    await waitForTx(await aaveOracleInstance.setAssetSources(assets, sources));
  } else {
    console.log(
      ` - Not admin, executed setAssetSources from multisig:`,
      aclAdmin.address
    );
    const calldata = aaveOracleInstance.interface.encodeFunctionData(
      "setAssetSources",
      [assets, sources]
    );
    console.log(" - aaveOracle: ", aaveOracleInstance.address);
    console.log(" - Calldata: ", calldata);
  }
  console.log(`[Deployment] Updated PriceOracle ${[assets, sources]}`);

  console.log(`[Deployment] Configured all oracle`);
});
