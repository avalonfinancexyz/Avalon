import { task } from "hardhat/config";
import { BigNumberish } from "ethers";
import { eNetwork, loadPoolConfig } from "../../helpers";
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

task(`update-reserve-factor`, `update reserve factor`)
  .addFlag("fix")
  .addOptionalParam("checkOnly")
  .setAction(
    async ({ fix, checkOnly }: { fix: boolean; checkOnly: string }, hre) => {
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

        let normalizedSymbol = normalizedSymbols.find((s) =>
          symbol.replace("-", "").toUpperCase().includes(s.toUpperCase())
        );

        if (symbol.includes(".ENA")) {
          normalizedSymbol = `${normalizedSymbol}ENA`;
        }
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
        const expectedFactor: BigNumberish =
          poolConfig.ReservesConfig[normalizedSymbol.toUpperCase()]
            .reserveFactor;

        let { reserveFactor: currentFactor } =
          await dataProvider.getReserveConfigurationData(tokenAddress);

        const normalizedFactor = currentFactor.toString();
        const delta = diff(expectedFactor, normalizedFactor);
        if (delta) {
          console.log(
            `- Found ${chalk.red("differences")} at reserve ${normalizedSymbol}`
          );
          console.log(
            chalk.red(
              "Current factor",
              "=>",
              chalk.green("Desired strategy from config")
            )
          );
          console.log(formatters.console.format(delta, expectedFactor));

          if (fix) {
            const aclAdmin = await hre.ethers.getSigner(
              await poolAddressesProvider.getACLAdmin()
            );
            const isAdmin = aclAdmin.address == deployer;
            if (isAdmin) {
              console.log("  - Update a new factor of asset");
              await waitForTx(
                await poolConfigurator.setReserveFactor(
                  tokenAddress,
                  expectedFactor
                )
              );
              console.log(
                "  - Updated Reserve Factor of",
                normalizedSymbol,
                "at",
                expectedFactor
              );
            } else {
              console.log(
                ` - Not admin, executed setReserveFactor from multisig:`,
                aclAdmin.address
              );
              const calldata = poolConfigurator.interface.encodeFunctionData(
                "setReserveFactor",
                [tokenAddress, expectedFactor]
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
