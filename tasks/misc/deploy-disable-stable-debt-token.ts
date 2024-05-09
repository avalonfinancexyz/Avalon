import { ZERO_ADDRESS} from "../../helpers/constants";
import {
  getPoolAddressesProvider,
} from "../../helpers/contract-getters";
import {
  DISABLE_STABLE_DEBT_TOKEN_IMPL_ID,
  POOL_ADDRESSES_PROVIDER_ID,
} from "../../helpers/deploy-ids";
import {
  StableDebtToken,
} from "../../typechain";
import { getAddressFromJson } from "../../helpers/utilities/tx";
import { waitForTx } from "../../helpers/utilities/tx";
import { task } from "hardhat/config";
import { FORK } from "../../helpers/hardhat-config-helpers";
import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";


task(`deploy-disable-stable-debt-token`)
  .setAction(
    async ({},{ deployments, getNamedAccounts, ...hre }) => {
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

      const newStableDebtTokenArtifact = await deployments.deploy(DISABLE_STABLE_DEBT_TOKEN_IMPL_ID, {
        contract: "DisableStableDebtToken",
        from: deployer,
        args: [poolAddress],
        ...COMMON_DEPLOY_PARAMS,
      });

      const stableDebtToken = (await hre.ethers.getContractAt(
        newStableDebtTokenArtifact.abi,
        newStableDebtTokenArtifact.address
      )) as StableDebtToken;
      
      await waitForTx(
        await stableDebtToken.initialize(
          poolAddress, // initializingPool
          ZERO_ADDRESS, // underlyingAsset
          ZERO_ADDRESS, // incentivesController
          0, // debtTokenDecimals
          "DISABLE_STABLE_DEBT_TOKEN_IMPL", // debtTokenName
          "DISABLE_STABLE_DEBT_TOKEN_IMPL", // debtTokenSymbol
          "0x00" // params
        )
      );

      try {
        await hre.run("verify:verify", {
          address: newStableDebtTokenArtifact.address,
          constructorArguments: [poolAddress],
        });
      } catch (error) {
        console.error(error);
      }
    }
  );