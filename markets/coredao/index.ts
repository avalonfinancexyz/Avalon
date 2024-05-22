import {
  AssetType,
  eCoredaoNetwork,
  IAaveConfiguration,
  TransferStrategy,
} from "./../../helpers/types";
import AaveMarket from "../aave";
import {
  strategyWCORE,
  strategyCOREBTC,
  strategyUSDC,
  strategyUSDT,
} from "./reservesConfigs";
import {
  rateStrategyVolatileOne,
  rateStrategyStableOne,
  rateStrategyStableTwo,
  rateStrategyVolatileTwo,
  rateStrategyStableThree,
  rateStrategyVolatileThree
} from "./rateStrategies";
import { ZERO_ADDRESS } from "../../helpers";

export const CoredaoConfig: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 34,
  WrappedNativeTokenSymbol: "WCORE",
  MarketId: "Coredao Avalon Market",
  ATokenNamePrefix: "Avalon",
  StableDebtTokenNamePrefix: "Avalon",
  VariableDebtTokenNamePrefix: "Avalon",
  SymbolPrefix: "Core",
  // for testent
  TestnetMarket: false,
  ReservesConfig: {
    WCORE: strategyWCORE,
    COREBTC: strategyCOREBTC,
    USDC: strategyUSDC,
    USDT: strategyUSDT,
  },
  ReserveAssets: {
    [eCoredaoNetwork.main]: {
      WCORE: "0x40375c92d9faf44d2f9db9bd9ba41a3317a2404f",
      COREBTC: "0x8034aB88C3512246Bf7894f57C834DdDBd1De01F",
      USDC: "0xa4151b2b3e269645181dccf2d426ce75fcbdeca9",
      USDT: "0x900101d06A7426441Ae63e9AB3B9b0F63Be145F1",
    },
    [eCoredaoNetwork.testnet]: {
      WCORE: "0x0000000000000000000000000000000000000000",
    },
  },
  IncentivesConfig: {
    enabled: {
      [eCoredaoNetwork.main]: true,
      [eCoredaoNetwork.testnet]: true,
    },
    rewards: {
      [eCoredaoNetwork.main]: {},
      [eCoredaoNetwork.testnet]: {
        POINTS: ZERO_ADDRESS,
      },
    },
    rewardsOracle: {},
    incentivesInput: {
      [eCoredaoNetwork.main]: [
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
      [eCoredaoNetwork.testnet]: [],
    },
  },
  EModes: {},
  ChainlinkAggregator: {
    [eCoredaoNetwork.main]: {
      WCORE: "0x95d43F4Abddb71E03A940d4cd654Da5Ce6768443",
      COREBTC: "0x1280036a9da98f35536c7ef07a78c97b38d10e40",
      USDC: "0xe05e46a42d05fcad5fa52f443d5963635aaf7a06",
      USDT: "0x2be335322f05aff78e4b231c9f175cba9ae31729",
    },
    [eCoredaoNetwork.testnet]: {
      WCORE: "0x95d43F4Abddb71E03A940d4cd654Da5Ce6768443",
    },
  },
  RateStrategies: {
    rateStrategyVolatileOne,
    rateStrategyStableOne,
    rateStrategyStableTwo,
    rateStrategyVolatileTwo,
    rateStrategyStableThree,
    rateStrategyVolatileThree
  },
};

export default CoredaoConfig;
