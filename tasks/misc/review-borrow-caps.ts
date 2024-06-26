import { eNetwork } from "../../helpers/types";
import {
  POOL_CONFIGURATOR_PROXY_ID,
  POOL_DATA_PROVIDER,
} from "../../helpers/deploy-ids";
import { getAddressFromJson } from "../../helpers/utilities/tx";
import { loadPoolConfig } from "../../helpers/market-config-helpers";
import { 
    getPoolConfiguratorProxy,
    getPoolAddressesProvider
} from "../../helpers/contract-getters";
import { task } from "hardhat/config";
import { waitForTx } from "../../helpers/utilities/tx";
import { getAaveProtocolDataProvider } from "../../helpers/contract-getters";
import { MARKET_NAME } from "../../helpers/env";
import { FORK } from "../../helpers/hardhat-config-helpers";
import chalk from "chalk";
import { exit } from "process";
import { getAddress } from "ethers/lib/utils";

// If the fix flag is present it will change the borrow cap to the expected local market configuration
task(`review-borrow-caps`, ``)
  // --fix
  .addFlag("fix")
  // Optional parameter to check only the desired tokens by symbol and separated by comma
  // --checkOnly DAI,USDC,ETH
  .addOptionalParam("checkOnly")
  .setAction(
    async ({ fix, checkOnly }: { fix: boolean; checkOnly: string }, hre) => {
      const network = FORK ? FORK : (hre.network.name as eNetwork);
      const { poolAdmin } = await hre.getNamedAccounts();
      const checkOnlyReserves: string[] = checkOnly ? checkOnly.split(",") : [];
      const dataProvider = await getAaveProtocolDataProvider(
        await getAddressFromJson(network, POOL_DATA_PROVIDER)
      );
      const poolConfigurator = (
        await getPoolConfiguratorProxy(
          await getAddressFromJson(network, POOL_CONFIGURATOR_PROXY_ID)
        )
      ).connect(await hre.ethers.getSigner(poolAdmin));

      const poolAddressesProvider = await getPoolAddressesProvider();
      const admin = await poolAddressesProvider.owner();

      const poolConfig = await loadPoolConfig(MARKET_NAME);
      const reserves = await dataProvider.getAllReservesTokens();

      const reservesToCheck = checkOnlyReserves.length
        ? reserves.filter(([reserveSymbol]) =>
            checkOnlyReserves.includes(reserveSymbol)
          )
        : reserves;

      const reserveAssets = poolConfig.ReserveAssets?.[network];
      if (!reserveAssets) {
        console.log("Exiting due missing ReserveAssets");
        exit(2);
      }

      for (let index = 0; index < reservesToCheck.length; index++) {
        const { symbol, tokenAddress } = reservesToCheck[index];

        let normalizedSymbol = "";
        Object.values(reserveAssets).forEach((value, index) => {
          if (getAddress(value) === getAddress(tokenAddress)) {
            normalizedSymbol = Object.keys(reserveAssets)[index];
          }
        });
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
        const expectedBorrowCap =
          poolConfig.ReservesConfig[normalizedSymbol.toUpperCase()].borrowCap;
        const onChainBorrowCap = (
          await dataProvider.getReserveCaps(tokenAddress)
        ).borrowCap.toString();

        const delta = expectedBorrowCap !== onChainBorrowCap;
        if (delta) {
          console.log(
            "- Found differences of the borrow cap for ",
            normalizedSymbol
          );
          console.log(
            "  - Expected:",
            Number(expectedBorrowCap).toLocaleString(undefined, {
              currency: "usd",
            })
          );
          console.log(
            "  - Current :",
            Number(onChainBorrowCap).toLocaleString(undefined, {
              currency: "usd",
            })
          );

          if (!fix) {
            continue;
          }
          console.log("[FIX] Updating the borrow cap for", normalizedSymbol);
          const isAdmin = admin == poolAdmin;
          if (isAdmin){
            await waitForTx(
                await poolConfigurator.setBorrowCap(tokenAddress, expectedBorrowCap)
              );
              const newOnChainBorrowCap = (
                await dataProvider.getReserveCaps(tokenAddress)
              ).borrowCap.toString();
              console.log(
                "[FIX] Set ",
                normalizedSymbol,
                "Borrow cap to",
                Number(newOnChainBorrowCap).toLocaleString(undefined, {
                  currency: "usd",
                })
              );
          } else {
            console.log(` - Not pool admin, executed setBorrowCap from multisig:`, admin);
            const calldata = poolConfigurator.interface.encodeFunctionData(
              "setBorrowCap",
              [tokenAddress, expectedBorrowCap]
            );
            console.log(" - poolConfigurator: ", poolConfigurator.address);
            console.log(" - Calldata: ", calldata);
          }

        } else {
          console.log(
            chalk.green(
              `  - Reserve ${normalizedSymbol} supply cap follows the expected configuration`
            )
          );
          continue;
        }
      }
    }
  );
