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
  strategySOLVBTCBBN,
  strategyPUMPBTC,
} from "./reservesConfigs";
import {
  rateStrategyVolatileOne,
  rateStrategyStableOne,
  rateStrategyStableTwo,
  rateStrategyVolatileTwo,
  rateStrategyStableThree,
  rateStrategyVolatileThree,
  rateStrategyVolatileBTCOne,
  rateStrategyVolatileBTCTwo,
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
    // WBNB: strategyWBNB,
    // ETH: strategyETH,
    // USDC: strategyUSDC,
    // USDT: strategyUSDT,
    // SOLVBTC: strategySOLVBTC,
    BTCB: strategyBTCB,
    // SOLVBTCENA: strategySOLVBTCENA,
    // SOLVBTCBBN: strategySOLVBTCBBN,
    PUMPBTC: strategyPUMPBTC,
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
      SOLVBTCBBN: "0x1346b618dc92810ec74163e4c27004c921d446a5",
    },
    [eBscNetwork.mainPumpBTC]: {
      BTCB: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
      PUMPBTC: "0xf9C4FF105803A77eCB5DAE300871Ad76c2794fa4",
    },
    [eBscNetwork.testnet]: {
      WBNB: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    },
  },
  IncentivesConfig: {
    enabled: {
      [eBscNetwork.main]: true,
      [eBscNetwork.mainPumpBTC]: true,
      [eBscNetwork.testnet]: true,
    },
    rewards: {
      [eBscNetwork.main]: {},
      [eBscNetwork.mainPumpBTC]: {},
      [eBscNetwork.testnet]: {
        POINTS: ZERO_ADDRESS,
      },
    },
    rewardsOracle: {},
    incentivesInput: {
      [eBscNetwork.main]: [],
      [eBscNetwork.mainPumpBTC]: [],
      [eBscNetwork.testnet]: [],
    },
  },
  EModes: {},
  ChainlinkAggregator: {
    [eBscNetwork.main]: {
      WBNB: "0xE3571D2426E842fa3422E1610678506EB34675F6",
      ETH: "0xc7c18F507617eac8CAF15d4aaa9D208ad1314F67",
      USDC: "0x463e8F1CB7F663afee6e66717FE0b896FBA9689C",
      USDT: "0xa1b70AADB162Ea9c7A1e5dD23720E6d4343C9264",
      SOLVBTC: "0xD71E8d3A49A5325F41e5c50F04E74C7281b37f9D",
      BTCB: "0xD71E8d3A49A5325F41e5c50F04E74C7281b37f9D",
      SOLVBTCENA: "0xD71E8d3A49A5325F41e5c50F04E74C7281b37f9D",
      SOLVBTCBBN: "0xD71E8d3A49A5325F41e5c50F04E74C7281b37f9D",
    },
    [eBscNetwork.mainPumpBTC]: {
      BTCB: "0xD71E8d3A49A5325F41e5c50F04E74C7281b37f9D",
      PUMPBTC: "0xD71E8d3A49A5325F41e5c50F04E74C7281b37f9D",
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
    rateStrategyVolatileBTCTwo,
  },
};

export default BscConfig;
