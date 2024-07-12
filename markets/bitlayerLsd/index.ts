import {
  AssetType,
  eBitlayerNetwork,
  IAaveConfiguration,
  TransferStrategy,
} from "../../helpers/types";
import AaveMarket from "../aave";
import { strategyWBTC, strategySTBTC } from "./reservesConfigs";
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

export const BitlayerLSDConfig: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 33,
  WrappedNativeTokenSymbol: "WBTC",
  MarketId: "Avalon Bitlayer LSD Market",
  ATokenNamePrefix: "Avalon",
  StableDebtTokenNamePrefix: "Avalon",
  VariableDebtTokenNamePrefix: "Avalon",
  SymbolPrefix: "BitLSD",
  // for testent
  TestnetMarket: false,
  ReservesConfig: {
    WBTC: strategyWBTC,
    STBTC: strategySTBTC,
  },
  ReserveAssets: {
    [eBitlayerNetwork.mainLsd]: {
      WBTC: "0xfF204e2681A6fA0e2C3FaDe68a1B28fb90E4Fc5F",
      STBTC: "0xf6718b2701d4a6498ef77d7c152b2137ab28b8a3",
    },
    [eBitlayerNetwork.testnet]: {
      WBTC: "0xfF204e2681A6fA0e2C3FaDe68a1B28fb90E4Fc5F",
      ETH: "0xEf63d4E178b3180BeEc9B0E143e0f37F4c93f4C2",
      USDC: "0x9827431e8b77e87c9894bd50b055d6be56be0030",
      USDT: "0xfe9f969faf8ad72a83b761138bf25de87eff9dd2",
    },
  },
  IncentivesConfig: {
    enabled: {
      [eBitlayerNetwork.mainLsd]: true,
      [eBitlayerNetwork.testnet]: true,
    },
    rewards: {
      [eBitlayerNetwork.mainLsd]: {},
      [eBitlayerNetwork.testnet]: {
        POINTS: ZERO_ADDRESS,
      },
    },
    rewardsOracle: {},
    incentivesInput: {
      [eBitlayerNetwork.mainLsd]: [
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
      [eBitlayerNetwork.testnet]: [],
    },
  },
  EModes: {},
  ChainlinkAggregator: {
    [eBitlayerNetwork.mainLsd]: {
      WBTC: "0x29304F0c6fd0Db604312d6E982164e1E7C3adAD9",
      STBTC: "0x29304F0c6fd0Db604312d6E982164e1E7C3adAD9",
    },
    [eBitlayerNetwork.testnet]: {
      WBTC: "0x2b3f685266524e921cb5dd3094e57e85a3000487",
    },
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

export default BitlayerLSDConfig;
