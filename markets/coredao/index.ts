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
  strategySOLVBTC,
  strategySOLVBTCENA,
} from "./reservesConfigs";
import {
  rateStrategyVolatileOne,
  rateStrategyStableOne,
  rateStrategyStableTwo,
  rateStrategyVolatileTwo,
  rateStrategyStableThree,
  rateStrategyVolatileThree,
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
    // WCORE: strategyWCORE,
    // COREBTC: strategyCOREBTC,
    // USDC: strategyUSDC,
    // USDT: strategyUSDT,
    // SOLVBTC: strategySOLVBTC,
    SOLVBTCENA: strategySOLVBTCENA,
  },
  ReserveAssets: {
    [eCoredaoNetwork.main]: {
      WCORE: "0x40375c92d9faf44d2f9db9bd9ba41a3317a2404f",
      COREBTC: "0x8034aB88C3512246Bf7894f57C834DdDBd1De01F",
      USDC: "0xa4151b2b3e269645181dccf2d426ce75fcbdeca9",
      USDT: "0x900101d06A7426441Ae63e9AB3B9b0F63Be145F1",
      SOLVBTC: "0x5B1Fb849f1F76217246B8AAAC053b5C7b15b7dc3",
      SOLVBTCENA: "0xe04d21d999FaEDf1e72AdE6629e20A11a1ed14FA",
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
      WCORE: "0x6b0e702586c6091af8da8ab64710916f0a58b72f",
      COREBTC: "0x167bf0f73b7606eb5f5ebde59a30a0a25828837c",
      USDC: "0x6361b75086d28c45bc5b5529cdfcc71a3b3b54c4",
      USDT: "0x2efb68fa0c4fc0a16537ff0af09d86005c267946",
      SOLVBTC: "0x167bf0f73b7606eb5f5ebde59a30a0a25828837c",
      SOLVBTCENA: "0x167bf0f73b7606eb5f5ebde59a30a0a25828837c",
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
    rateStrategyVolatileThree,
  },
};

export default CoredaoConfig;
