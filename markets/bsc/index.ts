import {
  AssetType,
  eBscNetwork,
  IAaveConfiguration,
  TransferStrategy,
} from "./../../helpers/types";
import AaveMarket from "../aave";
import {
  strategyWBNB,
  strategyETH,
  strategyUSDC,
  strategyUSDT,
  strategySOLVBTC,
  strategyBTCB,
  strategySOLVBTCENA,
} from "./reservesConfigs";
import {
  rateStrategyVolatileOne,
  rateStrategyStableOne,
  rateStrategyStableTwo,
  rateStrategyVolatileTwo,
  rateStrategyStableThree,
  rateStrategyVolatileThree,
  rateStrategyVolatileBTCOne,
} from "./rateStrategies";
import { ZERO_ADDRESS } from "../../helpers";

export const BscConfig: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 33,
  WrappedNativeTokenSymbol: "WBNB",
  MarketId: "BSC Avalon Market",
  ATokenNamePrefix: "Avalon",
  StableDebtTokenNamePrefix: "Avalon",
  VariableDebtTokenNamePrefix: "Avalon",
  SymbolPrefix: "Bsc",
  // for testent
  TestnetMarket: false,
  ReservesConfig: {
    WBNB: strategyWBNB,
    ETH: strategyETH,
    USDC: strategyUSDC,
    USDT: strategyUSDT,
    SOLVBTC: strategySOLVBTC,
    BTCB: strategyBTCB,
    SOLVBTCENA: strategySOLVBTCENA,
  },
  ReserveAssets: {
    [eBscNetwork.main]: {
      WBNB: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      ETH: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
      USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
      USDT: "0x55d398326f99059fF775485246999027B3197955",
      SOLVBTC: "0x4aae823a6a0b376de6a78e74ecc5b079d38cbcf7",
      BTCB: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
      SOLVBTCENA: "0x53E63a31fD1077f949204b94F431bCaB98F72BCE",
    },
    [eBscNetwork.testnet]: {
      WBNB: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    },
  },
  IncentivesConfig: {
    enabled: {
      [eBscNetwork.main]: true,
      [eBscNetwork.testnet]: true,
    },
    rewards: {
      [eBscNetwork.main]: {},
      [eBscNetwork.testnet]: {
        POINTS: ZERO_ADDRESS,
      },
    },
    rewardsOracle: {},
    incentivesInput: {
      [eBscNetwork.main]: [
        // {
        //   emissionPerSecond: "1000000000000000000",
        //   duration: 2592000,
        //   asset: "WBTC",
        //   assetType: AssetType.VariableDebtToken,
        //   reward: "PAVAF",
        //   rewardOracle: "0",
        //   transferStrategy: TransferStrategy.PullRewardsStrategy,
        //   transferStrategyParams: "0",
        // },
      ],
      [eBscNetwork.testnet]: [],
    },
  },
  EModes: {},
  ChainlinkAggregator: {
    [eBscNetwork.main]: {
      WBNB: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
      ETH: "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e",
      USDC: "0x51597f405303C4377E36123cBc172b13269EA163",
      USDT: "0xB97Ad0E74fa7d920791E90258A6E2085088b4320",
      SOLVBTC: "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf",
      BTCB: "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf",
      SOLVBTCENA: "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf",
    },
    [eBscNetwork.testnet]: {
      WBNB: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
    },
  },
  RateStrategies: {
    rateStrategyVolatileOne,
    rateStrategyStableOne,
    rateStrategyStableTwo,
    rateStrategyVolatileTwo,
    rateStrategyStableThree,
    rateStrategyVolatileThree,
    rateStrategyVolatileBTCOne,
  },
};

export default BscConfig;
