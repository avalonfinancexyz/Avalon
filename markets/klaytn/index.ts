import {
  AssetType,
  eKlaytnNetwork,
  IAaveConfiguration,
  TransferStrategy,
} from "../../helpers/types";
import AaveMarket from "../aave";
import {
  strategyBTCB,
  strategyWKLAY,
  strategyMBTC,
  strategySTKAIA,
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

export const KlaytnConfig: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 34,
  WrappedNativeTokenSymbol: "WKLAY",
  MarketId: "Avalon Klaytn LSD Market",
  ATokenNamePrefix: "Avalon",
  StableDebtTokenNamePrefix: "Avalon",
  VariableDebtTokenNamePrefix: "Avalon",
  SymbolPrefix: "KLAY",
  // for testent
  TestnetMarket: false,
  ReservesConfig: {
    // BTCB: strategyBTCB,
    // MBTC: strategyMBTC,
    WKLAY: strategyWKLAY,
    STKAIA: strategySTKAIA,
  },
  ReserveAssets: {
    [eKlaytnNetwork.main]: {
      BTCB: "0x15d9f3ab1982b0e5a415451259994ff40369f584",
      MBTC: "0x0F921c39eFd98809FE6D20a88A4357454578987a",
    },
    [eKlaytnNetwork.mainStKaia]: {
      WKLAY: "0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432",
      STKAIA: "0x42952B873ed6f7f0A7E4992E2a9818E3A9001995",
    },
    // [eKlaytnNetwork.sepolia]: {
    // },
  },
  IncentivesConfig: {
    enabled: {
      [eKlaytnNetwork.main]: true,
      [eKlaytnNetwork.mainStKaia]: true,
      // [eKlaytnNetwork.testnet]: true,
    },
    rewards: {
      [eKlaytnNetwork.main]: {},
      [eKlaytnNetwork.mainStKaia]: {},
      // [eKlaytnNetwork.testnet]: {
      //   POINTS: ZERO_ADDRESS,
      // },
    },
    rewardsOracle: {},
    incentivesInput: {
      [eKlaytnNetwork.main]: [],
      [eKlaytnNetwork.mainStKaia]: [],
      // [eKlaytnNetwork.testnet]: [],
    },
  },
  EModes: {},
  ChainlinkAggregator: {
    [eKlaytnNetwork.main]: {
      BTCB: "0x1280036a9da98f35536c7ef07a78c97b38d10e40",
      MBTC: "0x1280036a9da98f35536c7ef07a78c97b38d10e40",
    },
    [eKlaytnNetwork.mainStKaia]: {
      WKLAY: "0x9cc5a6ac600f9558c9f1651d5bd140ce9b56344a",
      STKAIA: "0x9cc5a6ac600f9558c9f1651d5bd140ce9b56344a",
    },
    // [eKlaytnNetwork.testnet]: {
    //   BTCB: "0x2b3f685266524e921cb5dd3094e57e85a3000487",
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

export default KlaytnConfig;
