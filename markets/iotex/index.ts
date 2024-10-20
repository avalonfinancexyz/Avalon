import {
  AssetType,
  eIotexNetwork,
  IAaveConfiguration,
} from "../../helpers/types";
import AaveMarket from "../aave";
import { strategyIOTX, strategyUSDT, strategyUSDC } from "./reservesConfigs";
import {
  rateStrategyStableTwo,
  rateStrategyStableThree,
  rateStrategyVolatileThree,
} from "./rateStrategies";
import { ZERO_ADDRESS } from "../../helpers";

export const IotexConfig: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 34,
  WrappedNativeTokenSymbol: "WETH",
  MarketId: "Avalon Iotex LSD Market",
  ATokenNamePrefix: "Avalon",
  StableDebtTokenNamePrefix: "Avalon",
  VariableDebtTokenNamePrefix: "Avalon",
  SymbolPrefix: "Iotex",
  // for testent
  TestnetMarket: false,
  ReservesConfig: {
    IOTX: strategyIOTX,
    IOUSDT: strategyUSDT,
    IOUSDC: strategyUSDC,
  },
  ReserveAssets: {
    [eIotexNetwork.main]: {
      IOTX: "0xa00744882684c3e4747faefd68d283ea44099d03",
      IOUSDT: "0x6fbcdc1169b5130c59e72e51ed68a84841c98cd1",
      IOUSDC: "0x3b2bf2b523f54c4e454f08aa286d03115aff326c",
    },
    // [eIotexNetwork.sepolia]: {
    // },
  },
  IncentivesConfig: {
    enabled: {
      [eIotexNetwork.main]: true,
      // [eIotexNetwork.testnet]: true,
    },
    rewards: {
      [eIotexNetwork.main]: {},
      // [eIotexNetwork.testnet]: {
      //   POINTS: ZERO_ADDRESS,
      // },
    },
    rewardsOracle: {},
    incentivesInput: {
      [eIotexNetwork.main]: [],
      // [eIotexNetwork.testnet]: [],
    },
  },
  EModes: {},
  ChainlinkAggregator: {
    [eIotexNetwork.main]: {
      IOTX: "0x6717DC0D87a9BD6849F96948c29e8c8875c10096",
      IOUSDT: "0x09855b01E2DA90eCE1bD5F8803730cfE54575393",
      IOUSDC: "0xB6d107352806647918a7eA6832d0577e8d023B45",
    },
    // [eIotexNetwork.testnet]: {
    //   WBTC: "0x2b3f685266524e921cb5dd3094e57e85a3000487",
    // },
  },
  RateStrategies: {
    rateStrategyVolatileThree,
    rateStrategyStableTwo,
    rateStrategyStableThree,
  },
};

export default IotexConfig;
