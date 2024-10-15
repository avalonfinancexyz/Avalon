import { eContractid, IReserveParams } from "../../helpers/types";

import {
  rateStrategyVolatileTwo,
  rateStrategyStableTwo,
  rateStrategyVolatileOne,
  rateStrategyVolatileThree,
  rateStrategyVolatileBTC,
  rateStrategyVolatileBTCTwo,
} from "./rateStrategies";

export const strategyWBTC: IReserveParams = {
  strategy: rateStrategyVolatileBTC,
  baseLTVAsCollateral: "0",
  liquidationThreshold: "0",
  liquidationBonus: "0",
  liquidationProtocolFee: "1000",
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  flashLoanEnabled: false,
  reserveDecimals: "8",
  aTokenImpl: eContractid.AToken,
  reserveFactor: "3000",
  supplyCap: "0",
  borrowCap: "0",
  debtCeiling: "0",
  borrowableIsolation: false,
};

export const strategyTBTC: IReserveParams = {
  strategy: rateStrategyVolatileBTC,
  baseLTVAsCollateral: "0",
  liquidationThreshold: "0",
  liquidationBonus: "0",
  liquidationProtocolFee: "1000",
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  flashLoanEnabled: false,
  reserveDecimals: "18",
  aTokenImpl: eContractid.AToken,
  reserveFactor: "3000",
  supplyCap: "0",
  borrowCap: "0",
  debtCeiling: "0",
  borrowableIsolation: false,
};

export const strategySOLVBTC: IReserveParams = {
  strategy: rateStrategyVolatileBTCTwo,
  baseLTVAsCollateral: "7000",
  liquidationThreshold: "8000",
  liquidationBonus: "12000",
  liquidationProtocolFee: "1000",
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  flashLoanEnabled: true,
  reserveDecimals: "18",
  aTokenImpl: eContractid.AToken,
  reserveFactor: "2500",
  supplyCap: "0",
  borrowCap: "0",
  debtCeiling: "0",
  borrowableIsolation: false,
};

export const strategySOLVBTCBBN: IReserveParams = {
  strategy: rateStrategyVolatileBTCTwo,
  baseLTVAsCollateral: "7000",
  liquidationThreshold: "8000",
  liquidationBonus: "12000",
  liquidationProtocolFee: "1000",
  borrowingEnabled: true,
  stableBorrowRateEnabled: false,
  flashLoanEnabled: true,
  reserveDecimals: "18",
  aTokenImpl: eContractid.AToken,
  reserveFactor: "2500",
  supplyCap: "0",
  borrowCap: "0",
  debtCeiling: "0",
  borrowableIsolation: false,
};
