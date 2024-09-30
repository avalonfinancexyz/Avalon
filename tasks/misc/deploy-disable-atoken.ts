import { ZERO_ADDRESS } from "../../helpers/constants";
import { getPoolAddressesProvider } from "../../helpers/contract-getters";
import {
  DISABLE_ATOKEN_IMPL_ID,
  POOL_ADDRESSES_PROVIDER_ID,
} from "../../helpers/deploy-ids";
import { DisableATokenV2, StableDebtToken } from "../../typechain";
import { getAddressFromJson } from "../../helpers/utilities/tx";
import { waitForTx } from "../../helpers/utilities/tx";
import { task } from "hardhat/config";
import { FORK } from "../../helpers/hardhat-config-helpers";
import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";

task(`deploy-disable-atoken`).setAction(
  async ({}, { deployments, getNamedAccounts, ...hre }) => {
    const { deployer } = await getNamedAccounts();
    const network = FORK ? FORK : hre.network.name;

    if (!MARKET_NAME) {
      console.error("Missing MARKET_NAME env variable. Exiting.");
      return false;
    }

    const poolAddressesProvider = await getPoolAddressesProvider(
      await getAddressFromJson(network, POOL_ADDRESSES_PROVIDER_ID)
    );

    const poolAddress = await poolAddressesProvider.getPool();

    const newDisableTokenArtifact = await deployments.deploy(
      DISABLE_ATOKEN_IMPL_ID,
      {
        contract: "DisableATokenV2",
        from: deployer,
        args: [poolAddress],
        ...COMMON_DEPLOY_PARAMS,
      }
    );

    const disableAToken = (await hre.ethers.getContractAt(
      newDisableTokenArtifact.abi,
      newDisableTokenArtifact.address
    )) as DisableATokenV2;

    await waitForTx(
      await disableAToken.initialize(
        poolAddress, // initializingPool
        ZERO_ADDRESS, // treasury
        ZERO_ADDRESS, // underlyingAsset
        ZERO_ADDRESS, // incentivesController
        0, // aTokenDecimals
        "ATOKEN_IMPL", // aTokenName
        "ATOKEN_IMPL", // aTokenSymbol
        "0x00" // params
      )
    );

    try {
      await hre.run("verify:verify", {
        address: disableAToken.address,
        constructorArguments: [poolAddress],
      });
    } catch (error) {
      console.error(error);
    }
  }
);
