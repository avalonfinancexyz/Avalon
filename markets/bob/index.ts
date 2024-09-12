import {
  AssetType,
  eBitlayerNetwork,
  eBOBNetwork,
  eEthereumNetwork,
  IAaveConfiguration,
  TransferStrategy,
} from "../../helpers/types";
import AaveMarket from "../aave";
import {
  strategySOLVBTC,
  strategySOLVBTCBBN,
  strategyTBTC,
  strategyWBTC,
} from "./reservesConfigs";
import {
  rateStrategyVolatileOne,
  rateStrategyStableOne,
  rateStrategyStableTwo,
  rateStrategyVolatileTwo,
  rateStrategyStableThree,
  rateStrategyVolatileThree,
  rateStrategyVolatileBTC,
  rateStrategyVolatileBTCTwo,
} from "./rateStrategies";
import { ZERO_ADDRESS } from "../../helpers";

export const BOBConfig: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 34,
  WrappedNativeTokenSymbol: "WETH",
  MarketId: "Avalon BOB LSD Market",
  ATokenNamePrefix: "Avalon",
  StableDebtTokenNamePrefix: "Avalon",
  VariableDebtTokenNamePrefix: "Avalon",
  SymbolPrefix: "BOB",
  // for testent
  TestnetMarket: false,
  ReservesConfig: {
    WBTC: strategyWBTC,
    TBTC: strategyTBTC,
    SOLVBTC: strategySOLVBTC,
    SOLVBTCBBN: strategySOLVBTCBBN,
  },
  ReserveAssets: {
    [eBOBNetwork.main]: {
      WBTC: "0x03C7054BCB39f7b2e5B2c7AcB37583e32D70Cfa3",
      TBTC: "0xBBa2eF945D523C4e2608C9E1214C2Cc64D4fc2e2",
      SOLVBTC: "0x541fd749419ca806a8bc7da8ac23d346f2df8b77",
      SOLVBTCBBN: "0xcc0966d8418d412c599a6421b760a847eb169a8c",
    },
    // [eBOBNetwork.sepolia]: {
    // },
  },
  IncentivesConfig: {
    enabled: {
      [eBOBNetwork.main]: true,
      // [eBOBNetwork.testnet]: true,
    },
    rewards: {
      [eBOBNetwork.main]: {},
      // [eBOBNetwork.testnet]: {
      //   POINTS: ZERO_ADDRESS,
      // },
    },
    rewardsOracle: {},
    incentivesInput: {
      [eBOBNetwork.main]: [],
      // [eBOBNetwork.testnet]: [],
    },
  },
  EModes: {},
  ChainlinkAggregator: {
    [eBOBNetwork.main]: {
      WBTC: "0x0845e7d37E375d09bBEdBB3D5d5d0C91859f30b9",
      TBTC: "0x1Ff2fFada49646fB9b326EdF8A91446d3cf9a291",
      SOLVBTC: "0x1Ff2fFada49646fB9b326EdF8A91446d3cf9a291",
      SOLVBTCBBN: "0x1Ff2fFada49646fB9b326EdF8A91446d3cf9a291",
    },
    // [eBOBNetwork.testnet]: {
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
    rateStrategyVolatileBTCTwo,
  },
};

export default BOBConfig;
