import {
  AssetType,
  eMerlinNetwork,
  IAaveConfiguration,
  TransferStrategy,
} from "../../helpers/types";
import AaveMarket from "../aave";
import {
  strategyHUHU,
  strategyMBTC,
  strategyMSATS,
  strategyVOYA,
  strategyMRATS,
  strategyMP,
  strategyMNER,
  strategyBNBS,
  strategyMSTAR,
  strategySOlVBTCSLP,
  strategyWBTCSLP,
  strategyMBTCSLP,
  strategyDOG,
} from "./reservesConfigs";
import {
  rateStrategyVolatileOne,
  rateStrategyStableOne,
  rateStrategyStableTwo,
  rateStrategyVolatileTwo,
} from "./rateStrategies";
import { ZERO_ADDRESS } from "../../helpers";

export const MerlinInnConfig: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 31,
  WrappedNativeTokenSymbol: "WBTC",
  MarketId: "Avalon Innovation Market",
  ATokenNamePrefix: "Avalon Innovation",
  StableDebtTokenNamePrefix: "Avalon Innovation",
  VariableDebtTokenNamePrefix: "Avalon Innovation",
  SymbolPrefix: "Mer",
  // for testent
  TestnetMarket: false,
  ReservesConfig: {
    MBTC: strategyMBTC,
    VOYA: strategyVOYA,
    HUHU: strategyHUHU,
    MSATS: strategyMSATS,
    MRATS: strategyMRATS,
    MP: strategyMP,
    esMP: strategyMP,
    MNER: strategyMNER,
    BNBS: strategyBNBS,
    MSTAR: strategyMSTAR,
    SOlVBTCSLP: strategySOlVBTCSLP,
    WBTCSLP: strategyWBTCSLP,
    MBTCSLP: strategyMBTCSLP,
    DOG: strategyDOG,
  },
  ReserveAssets: {
    [eMerlinNetwork.mainInn]: {
      MBTC: "0xb880fd278198bd590252621d4cd071b1842e9bcd",
      VOYA: "0x480e158395cc5b41e5584347c495584ca2caf78d",
      HUHU: "0x7a677e59dc2c8a42d6af3a62748c5595034a008b",
      MSATS: "0x4DCb91Cc19AaDFE5a6672781EB09abAd00C19E4c",
      MRATS: "0x69181A1f082ea83A152621e4FA527C936abFa501",
      MP: "0xbd40c74cb5cf9f9252B3298230Cb916d80430bBa",
      esMP: "0x7126bd63713A7212792B08FA2c39d39190A4cF5b",
      MNER: "0x27622b326ff3ffa7dc10ae291800c3073b55aa39",
      BNBS: "0x33c70a08D0D427eE916576a7594b50d7F8f3FbE1",
      MSTAR: "0x09401c470a76Ec07512EEDDEF5477BE74bac2338",
      SOlVBTCSLP: "0x4920FB03F3Ea1C189dd216751f8d073dd680A136",
      WBTCSLP: "0xb00db5fAAe7682d80cA3CE5019E710ca08Bfbd66",
      MBTCSLP: "0xa41a8C64a324cD00CB70C2448697E248EA0b1ff2",
      DOG: "0x32A4b8b10222F85301874837F27F4c416117B811",
    },
    [eMerlinNetwork.testnet]: {
      MBTC: "0x67A1f4A939b477A6b7c5BF94D97E45dE87E608eF",
    },
  },
  IncentivesConfig: {
    enabled: {
      [eMerlinNetwork.mainInn]: true,
      [eMerlinNetwork.testnet]: true,
    },
    rewards: {
      [eMerlinNetwork.mainInn]: {
        // AVAF: "0x5607718c64334eb5174CB2226af891a6ED82c7C6",
        // PAVAF: ZERO_ADDRESS,
      },
      [eMerlinNetwork.testnet]: {
        // AVAF: ZERO_ADDRESS,
        POINTS: ZERO_ADDRESS,
      },
    },
    rewardsOracle: {},
    incentivesInput: {
      [eMerlinNetwork.mainInn]: [
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
      [eMerlinNetwork.testnet]: [],
    },
  },
  EModes: {},
  ChainlinkAggregator: {
    [eMerlinNetwork.mainInn]: {
      MBTC: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
      VOYA: "0x87727eEc90e4a5881e6a99E8681f1698EA0F7B27",
      HUHU: "0x6956ecB50a527c179f8Ba4dC8469c1115B55d794",
      MSATS: "0xB63334B22C9CcDc5e62ee80ed594d1bE89774947",
      MRATS: "0x073283e6eA77D27Da258446c58931aC228F50feA",
      MP: "0xBeA1Fd4ae06AC3041a23114BDb28488a8bbf4183",
      esMP: "0xBeA1Fd4ae06AC3041a23114BDb28488a8bbf4183",
      MNER: "0xcA2Da6D2c91a472b49fe10a672E2324912e582c0",
      BNBS: "0x3994D80F4939EB3d14fE2DfAD7D16CC99102c74c",
      MSTAR: "0xf5d620c25Bb2620d5d39f7a5A46d563FfD6225AE",
      SOlVBTCSLP: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
      WBTCSLP: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
      MBTCSLP: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
      DOG: "0xa24608f95b28a4f6107d8c4f12d1297dfef73b47",
    },
    [eMerlinNetwork.testnet]: {},
  },
  RateStrategies: {
    rateStrategyVolatileOne,
    rateStrategyStableOne,
    rateStrategyStableTwo,
    rateStrategyVolatileTwo,
  },
};

export default MerlinInnConfig;
