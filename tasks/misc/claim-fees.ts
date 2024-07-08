import { task } from "hardhat/config";
import { BigNumberish } from "ethers";
import { eNetwork, loadPoolConfig } from "../../helpers";
import {
  getPoolAddressesProvider,
  getPool,
} from "../../helpers/contract-getters";
import { IInterestRateStrategyParams } from "../../helpers/types";
import { getAaveProtocolDataProvider } from "../../helpers/contract-getters";
import { waitForTx } from "../../helpers/utilities/tx";
import { diff, formatters } from "jsondiffpatch";
import chalk from "chalk";
import { exit } from "process";
import { MARKET_NAME } from "../../helpers/env";
import { DefaultReserveInterestRateStrategy } from "../../typechain";

task(`claim-fees`, `claim fees`)
  .addFlag("fix")
  .addOptionalParam("checkOnly")
  .setAction(async ({}, hre) => {
    const network = (
      process.env.FORK ? process.env.FORK : hre.network.name
    ) as eNetwork;
    const { deployer, poolAdmin } = await hre.getNamedAccounts();

    const dataProvider = await getAaveProtocolDataProvider();

    const poolAddressesProvider = await getPoolAddressesProvider();
    const admin = await poolAddressesProvider.owner();
    const poolConfig = await loadPoolConfig(MARKET_NAME);
    const reserves = await dataProvider.getAllReservesTokens();
    const pool = await getPool(await poolAddressesProvider.getPool());

    const reservesAddress = reserves.map((reserve) => reserve.tokenAddress);

    const isAdmin = admin == deployer;

    if (isAdmin) {
      await waitForTx(await pool.mintToTreasury(reservesAddress));
    } else {
      console.log(
        ` - Not admin, executed mintToTreasury from multisig:`,
        admin
      );
      const calldata = pool.interface.encodeFunctionData("mintToTreasury", [
        reservesAddress,
      ]);
      console.log(" - pool: ", pool.address);
      console.log(" - Calldata: ", calldata);
    }
    console.log(`[Deployment] Claim fees ${reservesAddress}`);
  });
