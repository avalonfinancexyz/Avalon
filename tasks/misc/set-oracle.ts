import { task } from "hardhat/config";
import {
  ConfigNames,
  configureReservesByHelper,
  eNetwork,
  getReserveAddresses,
  getTreasuryAddress,
  IAaveConfiguration,
  initReservesByHelper,
  loadPoolConfig,
  POOL_ADDRESSES_PROVIDER_ID,
  POOL_DATA_PROVIDER,
  savePoolTokens,
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

task(`set-oracle`, `set oracle`).setAction(async (_, hre) => {
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

  // 1. Set price oracle
  const configPriceOracle = (await hre.deployments.get(ORACLE_ID)).address;
  const statePriceOracle = await addressesProviderInstance.getPriceOracle();
  if (getAddress(configPriceOracle) === getAddress(statePriceOracle)) {
    console.log("[addresses-provider] Price oracle already set. Skipping tx.");
  } else {
    await waitForTx(
      await addressesProviderInstance.setPriceOracle(configPriceOracle)
    );
    console.log(
      `[Deployment] Added PriceOracle ${configPriceOracle} to PoolAddressesProvider`
    );
  }

  console.log(`[Deployment] Configured all oracle`);
});
