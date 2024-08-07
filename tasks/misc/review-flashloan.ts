import { eNetwork } from "../../helpers/types";
import { loadPoolConfig } from "../../helpers/market-config-helpers";
import {
  getPoolAddressesProvider,
  getPoolConfiguratorProxy,
} from "../../helpers/contract-getters";
import { task } from "hardhat/config";
import { waitForTx } from "../../helpers/utilities/tx";
import { getAaveProtocolDataProvider } from "../../helpers/contract-getters";
import { MARKET_NAME } from "../../helpers/env";
import { FORK } from "../../helpers/hardhat-config-helpers";
import chalk from "chalk";
import { exit } from "process";

task(`review-flashloan`, ``)
  // --fix
  .addFlag("fix")
  .addFlag("vvv")
  // Optional parameter to check only the desired tokens by symbol and separated by comma
  // --checkOnly DAI,USDC,ETH
  .addOptionalParam("checkOnly")
  .setAction(
    async (
      {
        fix,
        vvv,
        checkOnly,
      }: { fix: boolean; vvv: boolean; checkOnly: string },
      hre
    ) => {
      const { poolAdmin } = await hre.getNamedAccounts();
      const poolAddressesProvider = await getPoolAddressesProvider();
      const admin = await poolAddressesProvider.owner();
      const checkOnlyReserves: string[] = checkOnly ? checkOnly.split(",") : [];
      const dataProvider = await getAaveProtocolDataProvider();
      const poolConfigurator = (await getPoolConfiguratorProxy()).connect(
        await hre.ethers.getSigner(poolAdmin)
      );

      const poolConfig = await loadPoolConfig(MARKET_NAME);
      const reserves = await dataProvider.getAllReservesTokens();

      const reservesToCheck = checkOnlyReserves.length
        ? reserves.filter(([reserveSymbol]) =>
            checkOnlyReserves.includes(reserveSymbol)
          )
        : reserves;

      const reserveAssets = await dataProvider.getAllReservesTokens();
      const normalizedSymbols = Object.keys(poolConfig.ReservesConfig);
      if (!reserveAssets) {
        console.error("- Exiting due missing ReserveAssets");
        exit(2);
      }

      for (let index = 0; index < reservesToCheck.length; index++) {
        const { symbol, tokenAddress } = reservesToCheck[index];

        let normalizedSymbol = normalizedSymbols.find((s) =>
          symbol.replace("-", "").toUpperCase().includes(s.toUpperCase())
        );
        if (symbol.includes(".ENA")) {
          normalizedSymbol = `${normalizedSymbol}ENA`;
        } else if (symbol.includes(".BBN")) {
          normalizedSymbol = `${normalizedSymbol}BBN`;
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
        const expectedFlashloanEnabled =
          poolConfig.ReservesConfig[normalizedSymbol.toUpperCase()]
            .flashLoanEnabled;
        const onChainFlashloanEnabled = await dataProvider.getFlashLoanEnabled(
          tokenAddress
        );

        const delta = expectedFlashloanEnabled !== onChainFlashloanEnabled;
        if (delta) {
          if (vvv) {
            console.log(
              "- Found differences of Flashloan Enabled for ",
              normalizedSymbol
            );
            console.log("  - Expected:", expectedFlashloanEnabled);
            console.log("  - Current :", onChainFlashloanEnabled);
          }
          if (!fix) {
            continue;
          }
          vvv &&
            console.log(
              "[FIX] Updating the Flashloan Status Enabled for",
              normalizedSymbol
            );
          const isAdmin = admin == poolAdmin;
          if (isAdmin) {
            await waitForTx(
              await poolConfigurator.setReserveFlashLoaning(
                tokenAddress,
                expectedFlashloanEnabled
              )
            );
            const newOnChainFlashloanEnabled =
              await dataProvider.getFlashLoanEnabled(tokenAddress);
            vvv &&
              console.log(
                "[FIX] Set ",
                normalizedSymbol,
                "Now Borrowing to",
                newOnChainFlashloanEnabled
              );
          } else {
            console.log(
              ` - Not pool admin, executed setReserveFlashLoaning from multisig:`,
              admin
            );
            const calldata = poolConfigurator.interface.encodeFunctionData(
              "setReserveFlashLoaning",
              [tokenAddress, expectedFlashloanEnabled]
            );
            console.log(" - poolConfigurator: ", poolConfigurator.address);
            console.log(" - Calldata: ", calldata);
          }
        } else {
          vvv &&
            console.log(
              chalk.green(
                `  - Reserve ${normalizedSymbol} Flashloan state follows the expected configuration`
              )
            );
          continue;
        }
      }
    }
  );
