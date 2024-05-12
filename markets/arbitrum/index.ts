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
  },
  ReserveAssets: {
    [eArbitrumNetwork.arbitrum]: {
      DAI: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      WBTC: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      WETH: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      SOLVBTC: "0x3647c54c4c2C65bC7a2D63c0Da2809B399DBBDC0",
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
      USDC: "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
      DAI: "0xc5C8E77B397E531B8EC06BFb0048328B30E9eCfB",
      WBTC: "0x6ce185860a4963106506C203335A2910413708e9",
      WETH: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
      USDT: "0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7",
      SOLVBTC: "0x6ce185860a4963106506C203335A2910413708e9",
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
