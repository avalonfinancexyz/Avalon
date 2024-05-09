import { loadPoolConfig, ConfigNames } from "../../helpers/market-config-helpers";
import { POOL_ADMIN, ZERO_ADDRESS} from "../../helpers/constants";
import {
  getStableDebtToken,
  getPoolAddressesProvider,
} from "../../helpers/contract-getters";
import {
  DISABLE_STABLE_DEBT_TOKEN_IMPL_ID,
  INCENTIVES_PROXY_ID,
  POOL_ADDRESSES_PROVIDER_ID,
  TREASURY_PROXY_ID,
  ACL_MANAGER_ID,
  RESERVES_SETUP_HELPER_ID,
} from "../../helpers/deploy-ids";
import {
  ACLManager,
} from "../../typechain";
import { IAaveConfiguration } from "../../helpers/types";
import { getAddressFromJson } from "../../helpers/utilities/tx";
import { getAaveProtocolDataProvider } from "../../helpers/contract-getters";
import { waitForTx } from "../../helpers/utilities/tx";
import { getPoolConfiguratorProxy } from "../../helpers/contract-getters";
import { task } from "hardhat/config";
import { FORK } from "../../helpers/hardhat-config-helpers";
import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";

// Returns true if tokens upgraded, false if not

task(`upgrade-stable-debt-tokens`)
  .addParam("revision")
  .setAction(
    async ({ revision }, { deployments, getNamedAccounts, ...hre }) => {
      const { deployer } = await getNamedAccounts();
      const network = FORK ? FORK : hre.network.name;

      const admin = POOL_ADMIN[network];

      if (!MARKET_NAME) {
        console.error("Missing MARKET_NAME env variable. Exiting.");
        return false;
      }
      const poolConfig = (await loadPoolConfig(
        MARKET_NAME as ConfigNames
      )) as IAaveConfiguration;

      const {
        StableDebtTokenNamePrefix,
        SymbolPrefix,
      } = poolConfig;

      const poolAddressesProvider = await getPoolAddressesProvider(
        await getAddressFromJson(network, POOL_ADDRESSES_PROVIDER_ID)
      );

      const treasury = await getAddressFromJson(network, TREASURY_PROXY_ID);

      const incentivesController = await getAddressFromJson(
        network,
        INCENTIVES_PROXY_ID
      );
      const protocolDataProvider = await getAaveProtocolDataProvider(
        await poolAddressesProvider.getPoolDataProvider()
      );

      const poolConfigurator = await getPoolConfiguratorProxy(
        await poolAddressesProvider.getPoolConfigurator()
      );
      

      const reserves = await protocolDataProvider.getAllReservesTokens();

      const newStableDebtTokenArtifact = await deployments.get(DISABLE_STABLE_DEBT_TOKEN_IMPL_ID);

      const deployedRevision = await (
        await (await getStableDebtToken(newStableDebtTokenArtifact.address)).DEBT_TOKEN_REVISION()
      ).toString();

      console.log("deployedRevision", deployedRevision, "revision", revision, deployedRevision !== revision)

      if (deployedRevision !== revision) {
        console.error(
          `- Deployed StableDebtToken implementation revision ${deployedRevision} does not match expected revision ${revision}`
        );
        return false;
      }

      for (let x = 0; x < reserves.length; x++) {
        const [symbol, asset] = reserves[x];
        const normalizedSymbol = symbol.replace("M-", "M");

        console.log(`- Updating s${symbol}...`);
        console.log("newImplementation: ", newStableDebtTokenArtifact.address);

        const args = {
          asset: asset,
          incentivesController: incentivesController,
          name: `Avalon ${StableDebtTokenNamePrefix} Stable Debt ${normalizedSymbol}`,
          symbol: `stableDebt${SymbolPrefix}${normalizedSymbol}`,
          implementation: newStableDebtTokenArtifact.address,
          params: `0x10`,
        };
        console.log(args);

        // if (deployer !== admin) {
        //   const calldata = poolConfigurator.interface.encodeFunctionData("updateStableDebtToken", [args]);
        //   console.warn(
        //     `- StableDebtToken deployed, execute update from multisig. Args: ${JSON.stringify(args)}, To: ${poolConfigurator.address}, Call data: ${calldata}`
        //   );
        //   continue;
        // }

        try {
          await waitForTx(
            await poolConfigurator.updateStableDebtToken(args)
          );
          console.log(`  - Updated implementation of stableDebt${SymbolPrefix}${normalizedSymbol}`);
        } catch (e) {
          console.error("failed to updateStableDebtToken skipping. Error: ", e);
          throw e;
        }
      }

    }
  );