import { task } from "hardhat/config";
import { eNetwork, getContract, getPoolLibraries } from "../../helpers";
import { getChainlinkOracles } from "../../helpers/market-config-helpers";
import {
  POOL_ADDRESSES_PROVIDER_ID,
  POOL_DATA_PROVIDER,
  POOL_IMPL_ID,
  POOL_CONFIGURATOR_IMPL_ID,
  ACL_MANAGER_ID,
  ORACLE_ID,
  EMISSION_MANAGER_ID,
  INCENTIVES_V2_IMPL_ID,
  ATOKEN_IMPL_ID,
  DELEGATION_AWARE_ATOKEN_IMPL_ID,
  STABLE_DEBT_TOKEN_IMPL_ID,
  VARIABLE_DEBT_TOKEN_IMPL_ID,
  INCENTIVES_PROXY_ID,
  POOL_CONFIGURATOR_PROXY_ID,
  POOL_PROXY_ID,
  RESERVES_SETUP_HELPER_ID
} from "../../helpers/deploy-ids";
import {
  loadPoolConfig,
  ConfigNames,
  getReserveAddresses,
} from "../../helpers/market-config-helpers";
import { PoolAddressesProvider } from "../../typechain";
import { ICommonConfiguration } from "../../helpers/types";
import { ZERO_ADDRESS } from "../../helpers/constants";
import { getPairsTokenAggregator } from "../../helpers/init-helpers";
import { MARKET_NAME } from "../../helpers/env";
import { parseUnits } from "ethers/lib/utils";

task(`verify-market`).setAction(
  async (_, { deployments, getNamedAccounts, ...hre }) => {
    const { get } = deployments;
    const { deployer } = await getNamedAccounts();
    const network = hre.network.name as eNetwork;
    const poolConfig = await loadPoolConfig(MARKET_NAME as ConfigNames);

    console.log(`- Verifying setup`);
    const reservesSetupHelperArtifact = await get(RESERVES_SETUP_HELPER_ID);

    try {
      await hre.run("verify:verify", {
        address: reservesSetupHelperArtifact.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.error(error);
    }

    console.log(`- Verifying provider`);
    const addressesProviderArtifact = await get(POOL_ADDRESSES_PROVIDER_ID);

    try {
      await hre.run("verify:verify", {
        address: addressesProviderArtifact.address,
        constructorArguments: ["0", deployer],
      });
    } catch (error) {
      console.error(error);
    }
    
    console.log(`- Verifying impl`);

    const addressesProviderInstance = (await getContract(
      "PoolAddressesProvider",
      addressesProviderArtifact.address
    )) as PoolAddressesProvider;

    const poolAddress = await addressesProviderInstance.getPool();

    const aTokenArtifact = await get(ATOKEN_IMPL_ID);

    try {
      await hre.run("verify:verify", {
        address: aTokenArtifact.address,
        constructorArguments: [poolAddress],
      });
    } catch (error) {
      console.error(error);
    }

    const delegationAwareATokenArtifact = await get(DELEGATION_AWARE_ATOKEN_IMPL_ID);
    
    try {
      await hre.run("verify:verify", {
        address: delegationAwareATokenArtifact.address,
        constructorArguments: [poolAddress],
      });
    } catch (error) {
      console.error(error);
    }

    const stableDebtTokenArtifact = await get(STABLE_DEBT_TOKEN_IMPL_ID);

    try {
      await hre.run("verify:verify", {
        address: stableDebtTokenArtifact.address,
        constructorArguments: [poolAddress],
      });
    } catch (error) {
      console.error(error);
    }

    const variableDebtTokenArtifact = await get(VARIABLE_DEBT_TOKEN_IMPL_ID);

    try {
      await hre.run("verify:verify", {
        address: variableDebtTokenArtifact.address,
        constructorArguments: [poolAddress],
      });
    } catch (error) {
      console.error(error);
    }

    console.log(`- Verifying Proxy`);

    const poolProxyArtifact = await get(POOL_PROXY_ID);

    try {
      await hre.run("verify:verify", {
        address: poolProxyArtifact.address,
        constructorArguments: [addressesProviderInstance.address],
      });
    } catch (error) {
      console.error(error);
    }

    const poolConfiguratorProxyArtifact = await get(POOL_CONFIGURATOR_PROXY_ID);

    try {
      await hre.run("verify:verify", {
        address: poolConfiguratorProxyArtifact.address,
        constructorArguments: [addressesProviderInstance.address],
      });
    } catch (error) {
      console.error(error);
    }

    const incentivesProxyArtifact = await get(INCENTIVES_PROXY_ID);

    try {
      await hre.run("verify:verify", {
        address: incentivesProxyArtifact.address,
        constructorArguments: [addressesProviderInstance.address],
      });
    } catch (error) {
      console.error(error);
    }

    console.log(`- Verifying pool`);
    const protocolDataProvider = await get(POOL_DATA_PROVIDER);

    try {
      await hre.run("verify:verify", {
        address: protocolDataProvider.address,
        constructorArguments: [addressesProviderArtifact.address],
      });
    } catch (error) {
      console.error(error);
    }

    const commonLibraries = await getPoolLibraries();
    const poolArtifact = await get(POOL_IMPL_ID);

    try {
      await hre.run("verify:verify", {
        address: poolArtifact.address,
        constructorArguments: [addressesProviderArtifact.address],
        libraries: {
          ...commonLibraries,
        },
      });
    } catch (error) {
      console.error(error);
    }

    const configuratorLogicArtifact = await get("ConfiguratorLogic");
    const poolConfigArtifact = await get(POOL_CONFIGURATOR_IMPL_ID);

    try {
      await hre.run("verify:verify", {
        address: poolConfigArtifact.address,
        constructorArguments: [],
        libraries: {
          ConfiguratorLogic: configuratorLogicArtifact.address,
        },
      });
    } catch (error) {
      console.error(error);
    }

    const aclManagerArtifact = await get(ACL_MANAGER_ID);

    try {
      await hre.run("verify:verify", {
        address: aclManagerArtifact.address,
        constructorArguments: [addressesProviderArtifact.address],
      });
    } catch (error) {
      console.error(error);
    }

    const { OracleQuoteUnit } = poolConfig as ICommonConfiguration;
    const reserveAssets = await getReserveAddresses(poolConfig, network);
    const chainlinkAggregators = await getChainlinkOracles(poolConfig, network);

    const [assets, sources] = getPairsTokenAggregator(
      reserveAssets,
      chainlinkAggregators
    );
    const fallbackOracleAddress = ZERO_ADDRESS;
    const oracleArtifact = await get(ORACLE_ID);

    try {
      await hre.run("verify:verify", {
        address: oracleArtifact.address,
        constructorArguments: [
          addressesProviderArtifact.address,
          assets,
          sources,
          fallbackOracleAddress,
          ZERO_ADDRESS,
          parseUnits("1", OracleQuoteUnit),
        ],
      });
    } catch (error) {
      console.error(error);
    }

    const emissionManagerArtifact = await get(EMISSION_MANAGER_ID);

    try {
      await hre.run("verify:verify", {
        address: emissionManagerArtifact.address,
        constructorArguments: [deployer],
      });
    } catch (error) {
      console.error(error);
    }


    const incentivesImplArtifact = await get(INCENTIVES_V2_IMPL_ID);

    try {
      await hre.run("verify:verify", {
        address: incentivesImplArtifact.address,
        constructorArguments: [emissionManagerArtifact.address],
      });
    } catch (error) {
      console.error(error);
    }

    const {
      ATokenNamePrefix,
      StableDebtTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      ReservesConfig,
      RateStrategies,
    } = poolConfig;

    for (const strategy in RateStrategies) {
      const strategyData = RateStrategies[strategy];
      const reserveStrategyArtifact = await get(
        `ReserveStrategy-${strategyData.name}`
      );
      try {
        await hre.run("verify:verify", {
          address: reserveStrategyArtifact.address,
          constructorArguments: [
            addressesProviderArtifact.address,
            strategyData.optimalUsageRatio,
            strategyData.baseVariableBorrowRate,
            strategyData.variableRateSlope1,
            strategyData.variableRateSlope2,
            strategyData.stableRateSlope1,
            strategyData.stableRateSlope2,
            strategyData.baseStableRateOffset,
            strategyData.stableRateExcessOffset,
            strategyData.optimalStableToTotalDebtRatio,
          ],
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
);
