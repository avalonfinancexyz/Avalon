import { task } from "hardhat/config";
import { BigNumberish } from "ethers";
import {
  eNetwork,
  loadPoolConfig,
} from "../../helpers";
import {
  getPoolAddressesProvider,
  getPoolConfiguratorProxy,
} from "../../helpers/contract-getters";
import { IInterestRateStrategyParams } from "../../helpers/types";
import { getAaveProtocolDataProvider } from "../../helpers/contract-getters";
import { waitForTx } from "../../helpers/utilities/tx";
import { diff, formatters } from "jsondiffpatch";
import chalk from "chalk";
import { exit } from "process";
import { MARKET_NAME } from "../../helpers/env";
import { DefaultReserveInterestRateStrategy } from "../../typechain";

task(`update-ltv`, `update ltv`)
  .addFlag("fix")
  .addOptionalParam("checkOnly")
  .setAction(
    async (
      {
        fix,
        checkOnly,
      }: { fix: boolean; checkOnly: string; }, 
      hre
    ) => {
      const network = (
        process.env.FORK ? process.env.FORK : hre.network.name
      ) as eNetwork;
      const { deployer, poolAdmin } = await hre.getNamedAccounts();

      const checkOnlyReserves: string[] = checkOnly ? checkOnly.split(",") : [];
      const dataProvider = await getAaveProtocolDataProvider();
      const poolConfigurator = (await getPoolConfiguratorProxy()).connect(
        await hre.ethers.getSigner(poolAdmin)
      );
      const poolAddressesProvider = await getPoolAddressesProvider();
      const admin = await poolAddressesProvider.owner();
      const poolConfig = await loadPoolConfig(MARKET_NAME);
      const reserves = await dataProvider.getAllReservesTokens();

      const reservesToCheck = checkOnlyReserves.length
        ? reserves.filter(([reserveSymbol]) =>
            checkOnlyReserves.includes(reserveSymbol)
          )
        : reserves;

      const normalizedSymbols = Object.keys(poolConfig.ReservesConfig);

      for (let index = 0; index < reservesToCheck.length; index++) {
        let { symbol, tokenAddress } = reservesToCheck[index];
        
        const normalizedSymbol = normalizedSymbols.find((s) =>
          symbol.replace("-", "").toUpperCase().includes(s.toUpperCase())
        );
        if (!normalizedSymbol) {
          console.error(
            `- Missing address ${tokenAddress} at ReserveAssets configuration.`
          );
          exit(3);
        }

        console.log(
          "- Checking reserve",
          symbol,
          `, normalized symbol`,
          normalizedSymbol
        );
        const {
          baseLTVAsCollateral :expectedBaseLTV, 
          liquidationThreshold: expectedLiquidationThreshold, 
          liquidationBonus: expectedliquidationBonus 
        } = poolConfig.ReservesConfig[normalizedSymbol.toUpperCase()];
          
        let { 
          ltv: baseLTV, 
          liquidationThreshold: onchainLiqThreshold, 
          liquidationBonus: onchinLiqBonus 
        } = await dataProvider.getReserveConfigurationData(tokenAddress);

        const configData = {
          ltv: expectedBaseLTV,
          liqThreshold: expectedLiquidationThreshold,
          liqBonus: expectedliquidationBonus
        }

        const onChainData = {
          ltv: baseLTV.toString(),
          liqThreshold: onchainLiqThreshold.toString(),
          liqBonus: onchinLiqBonus.toString()
        }
        const delta = diff(onChainData, configData);
        if (delta) {
          console.log(
            `- Found ${chalk.red(
              "differences"
            )} at reserve ${normalizedSymbol}`
          );
          console.log(
            chalk.red(
              "Current ltv",
              "=>",
              chalk.green("Desired strategy from config")
            )
          );
          console.log(formatters.console.format(delta, configData));

          if (fix) {
            const isAdmin = admin == deployer;
            console.log("  - Update a new ltv of asset");
            if(isAdmin){
              await waitForTx(
                await poolConfigurator.configureReserveAsCollateral(
                  tokenAddress,
                  configData.ltv,
                  configData.liqThreshold,
                  configData.liqBonus
                )
              );
              console.log(
                "  - Updated ltv of",
                normalizedSymbol,
                "at",
                configData
              );
            } else {
              console.log(` - Not pool admin, executed setReserveInterestRateStrategyAddress from multisig:`, admin);
              const calldata = poolConfigurator.interface.encodeFunctionData(
                "configureReserveAsCollateral",
                [tokenAddress, configData.ltv, configData.liqThreshold, configData.liqBonus]
              );
              console.log(" - poolConfigurator: ", poolConfigurator.address);
              console.log(" - Calldata: ", calldata);
            }
          }
        } else {
          console.log(
            chalk.green(
              `  - Reserve ${normalizedSymbol} Interest Rate Strategy matches the expected configuration`
            )
          );
          continue;
        }
      }
    }
  );
