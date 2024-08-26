import {
  AssetType,
  eBitlayerNetwork,
  eEthereumNetwork,
  IAaveConfiguration,
  TransferStrategy,
} from "../../helpers/types";
import AaveMarket from "../aave";
import { strategySWBTC, strategyWBTC } from "./reservesConfigs";
import {
  rateStrategyVolatileOne,
  rateStrategyStableOne,
  rateStrategyStableTwo,
  rateStrategyVolatileTwo,
  rateStrategyStableThree,
  rateStrategyVolatileThree,
  rateStrategyVolatileBTC,
} from "./rateStrategies";
import { ZERO_ADDRESS } from "../../helpers";

export const EthSwellConfig: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 34,
  WrappedNativeTokenSymbol: "WETH",
  MarketId: "Avalon Ethereum Swell Market",
  ATokenNamePrefix: "Avalon",
  StableDebtTokenNamePrefix: "Avalon",
  VariableDebtTokenNamePrefix: "Avalon",
  SymbolPrefix: "EthSwell",
  // for testent
  TestnetMarket: false,
  ReservesConfig: {
    SWBTC: strategySWBTC,
    WBTC: strategyWBTC,
  },
  ReserveAssets: {
    [eEthereumNetwork.mainSwell]: {
      SWBTC: "0x8DB2350D78aBc13f5673A411D4700BCF87864dDE",
      WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    },
    // [eEthereumNetwork.sepolia]: {
    //   WBTC: "0xfF204e2681A6fA0e2C3FaDe68a1B28fb90E4Fc5F",
    //   ETH: "0xEf63d4E178b3180BeEc9B0E143e0f37F4c93f4C2",
    //   USDC: "0x9827431e8b77e87c9894bd50b055d6be56be0030",
    //   USDT: "0xfe9f969faf8ad72a83b761138bf25de87eff9dd2",
    // },
  },
  IncentivesConfig: {
    enabled: {
      [eEthereumNetwork.mainSwell]: true,
      // [eEthereumNetwork.sepolia]: true,
    },
    rewards: {
      [eEthereumNetwork.mainSwell]: {},
      // [eEthereumNetwork.sepolia]: {
      //   POINTS: ZERO_ADDRESS,
      // },
    },
    rewardsOracle: {},
    incentivesInput: {
      [eEthereumNetwork.mainSwell]: [
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
      // [eEthereumNetwork.sepolia]: [],
    },
  },
  EModes: {},
  ChainlinkAggregator: {
    [eEthereumNetwork.mainSwell]: {
      SWBTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      WBTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
    },
    // [eEthereumNetwork.sepolia]: {
    //   WBTC: "0x2b3f685266524e921cb5dd3094e57e85a3000487",
    // },
  },
  RateStrategies: {
    rateStrategyVolatileOne,
    rateStrategyStableOne,
    rateStrategyStableTwo,
    rateStrategyVolatileTwo,
    rateStrategyVolatileThree,
    rateStrategyStableThree,
    rateStrategyVolatileBTC,
  },
};

export default EthSwellConfig;
