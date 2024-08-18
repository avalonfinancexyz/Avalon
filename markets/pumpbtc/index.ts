import {
  AssetType,
  eBitlayerNetwork,
  eEthereumNetwork,
  IAaveConfiguration,
  TransferStrategy,
} from "../../helpers/types";
import AaveMarket from "../aave";
import { strategyPUMPBTC, strategyFBTC, strategyWBTC } from "./reservesConfigs";
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

export const PumpBTCConfig: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 34,
  WrappedNativeTokenSymbol: "WETH",
  MarketId: "Avalon Ethereum PumpBTC Market",
  ATokenNamePrefix: "Avalon",
  StableDebtTokenNamePrefix: "Avalon",
  VariableDebtTokenNamePrefix: "Avalon",
  SymbolPrefix: "PumpBTC",
  // for testent
  TestnetMarket: false,
  ReservesConfig: {
    PUMPBTC: strategyPUMPBTC,
    FBTC: strategyFBTC,
    WBTC: strategyWBTC,
  },
  ReserveAssets: {
    [eEthereumNetwork.pumpBTC]: {
      PUMPBTC: "0xF469fBD2abcd6B9de8E169d128226C0Fc90a012e",
      FBTC: "0xc96de26018a54d51c097160568752c4e3bd6c364",
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
      [eEthereumNetwork.pumpBTC]: true,
      // [eEthereumNetwork.sepolia]: true,
    },
    rewards: {
      [eEthereumNetwork.pumpBTC]: {},
      // [eEthereumNetwork.sepolia]: {
      //   POINTS: ZERO_ADDRESS,
      // },
    },
    rewardsOracle: {},
    incentivesInput: {
      [eEthereumNetwork.pumpBTC]: [
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
    [eEthereumNetwork.pumpBTC]: {
      PUMPBTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      FBTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
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

export default PumpBTCConfig;
