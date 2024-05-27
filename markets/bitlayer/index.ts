import {
  AssetType,
  eBitlayerNetwork,
  IAaveConfiguration,
  TransferStrategy,
} from "./../../helpers/types";
import AaveMarket from "../aave";
import {
  strategyWBTC,
  strategyETH,
  strategyUSDC,
  strategyUSDT,
  strategyBITUSD,
} from "./reservesConfigs";
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

export const BitlayerConfig: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 32,
  WrappedNativeTokenSymbol: "WBTC",
  MarketId: "Avalon Market",
  ATokenNamePrefix: "Avalon",
  StableDebtTokenNamePrefix: "Avalon",
  VariableDebtTokenNamePrefix: "Avalon",
  SymbolPrefix: "Bit",
  // for testent
  TestnetMarket: false,
  ReservesConfig: {
    WBTC: strategyWBTC,
    ETH: strategyETH,
    USDC: strategyUSDC,
    USDT: strategyUSDT,
    BITUSD: strategyBITUSD,
  },
  ReserveAssets: {
    [eBitlayerNetwork.main]: {
      WBTC: "0xfF204e2681A6fA0e2C3FaDe68a1B28fb90E4Fc5F",
      ETH: "0xEf63d4E178b3180BeEc9B0E143e0f37F4c93f4C2",
      USDC: "0x9827431e8b77e87c9894bd50b055d6be56be0030",
      USDT: "0xfe9f969faf8ad72a83b761138bf25de87eff9dd2",
      BITUSD: "0x07373d112EDc4570B46996Ad1187bc4ac9Fb5Ed0",
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
      [eBitlayerNetwork.main]: true,
      [eBitlayerNetwork.testnet]: true,
    },
    rewards: {
      [eBitlayerNetwork.main]: {},
      [eBitlayerNetwork.testnet]: {
        POINTS: ZERO_ADDRESS,
      },
    },
    rewardsOracle: {},
    incentivesInput: {
      [eBitlayerNetwork.main]: [
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
    [eBitlayerNetwork.main]: {
      WBTC: "0x2b3f685266524e921cb5dd3094e57e85a3000487",
      ETH: "0xe5b89f1e56045ae92518f4130947583608e2e163",
      USDC: "0x38fbaed34760231acff76601eaf7c30cef97b739",
      USDT: "0xa4886beb14e27bc6de4a504eb43e1a7b20961fa4",
      BITUSD: "0xD62d417Ccf5A7CF8022aF7CaE7F736d4069e9aaC",
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

export default BitlayerConfig;
