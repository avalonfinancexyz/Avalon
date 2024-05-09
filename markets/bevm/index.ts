import {
  AssetType,
  eBevmNetwork,
  IAaveConfiguration,
  TransferStrategy,
} from "../../helpers/types";
import AaveMarket from "../aave";
import { strategyWBTC } from "./reservesConfigs";
import {
  rateStrategyVolatileOne,
  rateStrategyStableOne,
} from "./rateStrategies";
import { ZERO_ADDRESS } from "../../helpers";

export const BevmConfig: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 30,
  WrappedNativeTokenSymbol: "WBTC",
  MarketId: "Avalon Market",
  ATokenNamePrefix: "Avalon",
  StableDebtTokenNamePrefix: "Avalon",
  VariableDebtTokenNamePrefix: "Avalon",
  SymbolPrefix: "Bevm",
  // for testent
  TestnetMarket: false,
  ReservesConfig: {
    WBTC: strategyWBTC,
  },
  ReserveAssets: {
    [eBevmNetwork.main]: {
      WBTC: "0xB5136FEba197f5fF4B765E5b50c74db717796dcD",
    },
    [eBevmNetwork.testnet]: {
      WBTC: "0x09Ff8E49D0EA411A3422ed95E8f5497D4241F532",
    },
  },
  IncentivesConfig: {
    enabled: {
      [eBevmNetwork.main]: true,
      [eBevmNetwork.testnet]: true,
    },
    rewards: {
      [eBevmNetwork.main]: {
        // AVAF: "0x5607718c64334eb5174CB2226af891a6ED82c7C6",
        // PAVAF: ZERO_ADDRESS,
      },
      [eBevmNetwork.testnet]: {
        // AVAF: ZERO_ADDRESS,
        POINTS: ZERO_ADDRESS,
      },
    },
    rewardsOracle: {},
    incentivesInput: {
      [eBevmNetwork.main]: [
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
      [eBevmNetwork.testnet]: [],
    },
  },
  EModes: {},
  ChainlinkAggregator: {
    [eBevmNetwork.main]: {
      WBTC: "0xaaF640C5a9Ad6027461b404c32e153591a0B533B",
    },
    [eBevmNetwork.testnet]: {},
  },
  RateStrategies: {
    rateStrategyVolatileOne,
    rateStrategyStableOne,
  },
};

export default BevmConfig;
