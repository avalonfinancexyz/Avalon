import { eArbitrumNetwork, IAaveConfiguration } from "./../../helpers/types";
import AaveMarket from "../aave";
import { ZERO_ADDRESS } from "../../helpers";
import {
  strategyDAI,
  strategyUSDC,
  strategyWBTC,
  strategyWETH,
  strategyUSDT,
  strategySOLVBTC,
  strategySOLVBTCENA,
  strategySOLVBTCBBN,
} from "./reservesConfigs";
import {
  rateStrategyVolatileOne,
  rateStrategyStableOne,
  rateStrategyStableTwo,
  rateStrategyVolatileTwo,
} from "./rateStrategies";

export const ArbitrumConfig: IAaveConfiguration = {
  ...AaveMarket,
  MarketId: "Arbitrum Avalon Market",
  ATokenNamePrefix: "Avalon",
  StableDebtTokenNamePrefix: "Avalon",
  VariableDebtTokenNamePrefix: "Avalon",
  SymbolPrefix: "Arb",
  ProviderId: 36,
  ReservesConfig: {
    DAI: strategyDAI,
    USDC: strategyUSDC,
    WBTC: strategyWBTC,
    WETH: strategyWETH,
    USDT: strategyUSDT,
    SOLVBTC: strategySOLVBTC,
    SOLVBTCENA: strategySOLVBTCENA,
    SOLVBTCBBN: strategySOLVBTCBBN,
  },
  ReserveAssets: {
    [eArbitrumNetwork.arbitrum]: {
      DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      WBTC: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      WETH: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      SOLVBTC: "0x3647c54c4c2C65bC7a2D63c0Da2809B399DBBDC0",
      SOLVBTCENA: "0xaFAfd68AFe3fe65d376eEC9Eab1802616cFacCb8",
      SOLVBTCBBN: "0x346c574c56e1a4aaa8dc88cda8f7eb12b39947ab",
    },
    [eArbitrumNetwork.arbitrumTestnet]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WBTC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      USDT: ZERO_ADDRESS,
    },
    [eArbitrumNetwork.goerliNitro]: {
      DAI: ZERO_ADDRESS,
      USDC: ZERO_ADDRESS,
      WBTC: ZERO_ADDRESS,
      WETH: ZERO_ADDRESS,
      USDT: ZERO_ADDRESS,
    },
  },
  EModes: {},
  ChainlinkAggregator: {
    [eArbitrumNetwork.arbitrum]: {
      USDC: "0x9cc5a6ac600f9558c9f1651d5bd140ce9b56344a",
      DAI: "0x1280036a9da98f35536c7ef07a78c97b38d10e40",
      WBTC: "0xe05e46a42d05fcad5fa52f443d5963635aaf7a06",
      WETH: "0x2be335322f05aff78e4b231c9f175cba9ae31729",
      USDT: "0xa4886beb14e27bc6de4a504eb43e1a7b20961fa4",
      SOLVBTC: "0xe5b89f1e56045ae92518f4130947583608e2e163",
      SOLVBTCENA: "0xe5b89f1e56045ae92518f4130947583608e2e163",
      SOLVBTCBBN: "0xe5b89f1e56045ae92518f4130947583608e2e163",
    },
  },
  RateStrategies: {
    rateStrategyVolatileOne,
    rateStrategyStableOne,
    rateStrategyStableTwo,
    rateStrategyVolatileTwo,
  },
};

export default ArbitrumConfig;
