import {
  AssetType,
  eMerlinNetwork,
  IAaveConfiguration,
  TransferStrategy,
} from "./../../helpers/types";
import AaveMarket from "../aave";
import {
  strategyWBTC,
  strategyMBTC,
  strategyMERL,
  strategyMUSDC,
  strategyMUSDT,
  strategyMORDI,
  strategySOLVBTC,
  strategyMSTONE,
} from "./reservesConfigs";
import {
  rateStrategyVolatileOne,
  rateStrategyStableOne,
  rateStrategyStableTwo,
  rateStrategyVolatileTwo,
  rateStrategyVolatileBTC,
  rateStrategyStableThree,
} from "./rateStrategies";
import { ZERO_ADDRESS } from "../../helpers";

export const MerlinConfig: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 30,
  WrappedNativeTokenSymbol: "WBTC",
  MarketId: "Avalon Market",
  ATokenNamePrefix: "Avalon",
  StableDebtTokenNamePrefix: "Avalon",
  VariableDebtTokenNamePrefix: "Avalon",
  SymbolPrefix: "Mer",
  // for testent
  TestnetMarket: true,
  ReservesConfig: {
    WBTC: strategyWBTC,
    MBTC: strategyMBTC,
    // METH: strategyMETH,
    MORDI: strategyMORDI,
    MUSDT: strategyMUSDT,
    MUSDC: strategyMUSDC,
    SOLVBTC: strategySOLVBTC,
    MERL: strategyMERL,
    MSTONE: strategyMSTONE,
    ORDI: strategyMORDI,
  },
  ReserveAssets: {
    [eMerlinNetwork.main]: {
      WBTC: "0xF6D226f9Dc15d9bB51182815b320D3fBE324e1bA",
      MBTC: "0xb880fd278198bd590252621d4cd071b1842e9bcd",
      MUSDT: "0x967aEC3276b63c5E2262da9641DB9dbeBB07dC0d",
      MUSDC: "0x6b4eCAdA640F1B30dBdB68f77821A03A5f282EbE",
      MORDI: "0x0726523Eba12EdaD467c55a962842Ef358865559",
      SOLVBTC: "0x41D9036454BE47d3745A823C4aaCD0e29cFB0f71",
      MERL: "0x5c46bFF4B38dc1EAE09C5BAc65872a1D8bc87378",
      MSTONE: "0xB5d8b1e73c79483d7750C5b8DF8db45A0d24e2cf",
      ORDI: "0x7dcb50b2180BC896Da1200D2726a88AF5D2cBB5A",
    },
    [eMerlinNetwork.testnet]: {
      WBTC: ZERO_ADDRESS,
      MBTC: ZERO_ADDRESS,
      MUSDT: ZERO_ADDRESS,
      MUSDC: ZERO_ADDRESS,
      MORDI: ZERO_ADDRESS,
      SOLVBTC: ZERO_ADDRESS,
      MERL: ZERO_ADDRESS,
      MSTONE: ZERO_ADDRESS,
      ORDI: ZERO_ADDRESS,
    },
  },
  IncentivesConfig: {
    enabled: {
      [eMerlinNetwork.main]: true,
      [eMerlinNetwork.testnet]: true,
    },
    rewards: {
      [eMerlinNetwork.main]: {
        // AVAF: "0x5607718c64334eb5174CB2226af891a6ED82c7C6",
        // PAVAF: ZERO_ADDRESS,
      },
      [eMerlinNetwork.testnet]: {
        // AVAF: ZERO_ADDRESS,
        ESAVAF: "0xBA54aCA52D57A3beF3bab451e568141D6fF0ebFB",
      },
    },
    rewardsOracle: {
      [eMerlinNetwork.testnet]: {
        ESAVAF: ZERO_ADDRESS,
      },
    },
    incentivesInput: {
      [eMerlinNetwork.main]: [
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
      [eMerlinNetwork.testnet]: [
        {
          emissionPerSecond: "100000000000000000",
          duration: 2592000,
          asset: "MBTC",
          assetType: AssetType.AToken,
          reward: "ESAVAF",
          rewardOracle: "0",
          transferStrategy: TransferStrategy.EsRewardsStrategy,
          transferStrategyParams: "0",
        },
        {
          emissionPerSecond: "100000000000000000",
          duration: 2592000,
          asset: "MBTC",
          assetType: AssetType.VariableDebtToken,
          reward: "ESAVAF",
          rewardOracle: "0",
          transferStrategy: TransferStrategy.EsRewardsStrategy,
          transferStrategyParams: "0",
        },
      ],
    },
  },
  EModes: {},
  ChainlinkAggregator: {
    [eMerlinNetwork.main]: {
      WBTC: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
      MBTC: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
      MUSDT: "0xb968194fb0dcd029b4ac14834cc623270b6a56d1",
      MUSDC: "0x821c3f40841b75f8849016de58a6939cab685ef4",
      MORDI: "0xff7013bc8123f801957e67bde37bcab222daf181",
      SOLVBTC: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
      MERL: "0x7c8cacdf03f842e883bb3a09811b5d04405f8ea8",
      MSTONE: "0xDdd5DbF22A5e5140fe9964309Af4bE65D6A7c1C9",
      ORDI: "0xff7013bc8123f801957e67bde37bcab222daf181",
    },
    [eMerlinNetwork.testnet]: {
      WBTC: "0x4675618a1f94c16babf3ad79fcfedd382d94a114",
      MBTC: "0x4675618a1f94c16babf3ad79fcfedd382d94a114",
      MUSDT: "0x4675618a1f94c16babf3ad79fcfedd382d94a114",
      MUSDC: "0x4675618a1f94c16babf3ad79fcfedd382d94a114",
      MORDI: "0x4675618a1f94c16babf3ad79fcfedd382d94a114",
      SOLVBTC: "0x4675618a1f94c16babf3ad79fcfedd382d94a114",
      MERL: "0x4675618a1f94c16babf3ad79fcfedd382d94a114",
      MSTONE: "0x4675618a1f94c16babf3ad79fcfedd382d94a114",
      ORDI: "0x4675618a1f94c16babf3ad79fcfedd382d94a114",
    },
  },
  RateStrategies: {
    rateStrategyVolatileOne,
    rateStrategyStableOne,
    rateStrategyStableTwo,
    rateStrategyVolatileTwo,
    rateStrategyVolatileBTC,
    rateStrategyStableThree,
  },
};

export default MerlinConfig;
