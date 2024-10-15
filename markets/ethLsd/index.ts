import {
  AssetType,
  eBitlayerNetwork,
  eEthereumNetwork,
  IAaveConfiguration,
  TransferStrategy,
} from "../../helpers/types";
import AaveMarket from "../aave";
import {
  strategySOLVBTC,
  strategyFBTC,
  strategyWBTC,
  strategySOLVBTCBBN,
  strategyLBTC,
  strategyEBTC,
  rateStrategyPTBTC,
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

export const EthLSDConfig: IAaveConfiguration = {
  ...AaveMarket,
  ProviderId: 34,
  WrappedNativeTokenSymbol: "WETH",
  MarketId: "Avalon Ethereum LSD Market",
  ATokenNamePrefix: "Avalon",
  StableDebtTokenNamePrefix: "Avalon",
  VariableDebtTokenNamePrefix: "Avalon",
  SymbolPrefix: "EthLSD",
  // for testent
  TestnetMarket: false,
  ReservesConfig: {
    // SOLVBTC: strategySOLVBTC,
    // FBTC: strategyFBTC,
    // WBTC: strategyWBTC,
    // SOLVBTCBBN: strategySOLVBTCBBN,
    LBTC: strategyLBTC,
    // EBTC: strategyEBTC,
    // PTcornSolvBTCBBN26DEC2024: rateStrategyPTBTC,
    // PTcornLBTC26DEC2024: rateStrategyPTBTC,
    // PTEBTC26DEC2024: rateStrategyPTBTC,
    // PTLBTC27MAR2025: rateStrategyPTBTC
  },
  ReserveAssets: {
    [eEthereumNetwork.mainLsd]: {
      SOLVBTC: "0x7a56e1c57c7475ccf742a1832b028f0456652f97",
      FBTC: "0xc96de26018a54d51c097160568752c4e3bd6c364",
      WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      SOLVBTCBBN: "0xd9D920AA40f578ab794426F5C90F6C731D159DEf",
      PTcornSolvBTCBBN26DEC2024: "0x23e479ddcda990E8523494895759bD98cD2fDBF6",
    },
    [eEthereumNetwork.LBTCLSD]: {
      LBTC: "0x8236a87084f8B84306f72007F36F2618A5634494",
      WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    },
    [eEthereumNetwork.EBTCLSD]: {
      // EBTC: "0x657e8C867D8B37dCC18fA4Caead9C45EB088C642",
      // WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      LBTC: "0x8236a87084f8B84306f72007F36F2618A5634494",
      PTcornLBTC26DEC2024: "0x332A8ee60EdFf0a11CF3994b1b846BBC27d3DcD6",
      PTEBTC26DEC2024: "0xb997b3418935a1df0f914ee901ec83927c1509a0",
      PTLBTC27MAR2025: "0xec5a52c685cc3ad79a6a347abace330d69e0b1ed"
    },
    // [eEthereumNetwork.sepolia]: {
    //   WBTC: "0xfF204e2681A6fA0e2C3FaDe68a1B28fb90E4Fc5F",
    //   ETH: "0xEf63d4E178b3180BeEc9B0E143e0f37F4c93f4C2",
    //   USDC: "0x9827431e8b77e87c9894bd50b055d6be56be0030",
    //   USDT: "0xfe9f969faf8ad72a83b761138bf25de87eff9dd2",
    // },
  },
  IncentivesConfig: {
    enabled: {
      [eEthereumNetwork.mainLsd]: true,
      [eEthereumNetwork.LBTCLSD]: true,
      [eEthereumNetwork.EBTCLSD]: true,
      // [eEthereumNetwork.sepolia]: true,
    },
    rewards: {
      [eEthereumNetwork.mainLsd]: {},
      [eEthereumNetwork.LBTCLSD]: {},
      [eEthereumNetwork.EBTCLSD]: {},
      // [eEthereumNetwork.sepolia]: {
      //   POINTS: ZERO_ADDRESS,
      // },
    },
    rewardsOracle: {},
    incentivesInput: {
      [eEthereumNetwork.mainLsd]: [
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
      [eEthereumNetwork.LBTCLSD]: [],
      [eEthereumNetwork.EBTCLSD]: [],
      // [eEthereumNetwork.sepolia]: [],
    },
  },
  EModes: {},
  ChainlinkAggregator: {
    [eEthereumNetwork.mainLsd]: {
      SOLVBTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      FBTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      WBTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      SOLVBTCBBN: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      PTcornSolvBTCBBN26DEC2024: "0xA4886BeB14E27Bc6De4A504Eb43e1a7B20961Fa4",
    },
    [eEthereumNetwork.LBTCLSD]: {
      LBTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      WBTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
    },
    [eEthereumNetwork.EBTCLSD]: {
      EBTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      WBTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      LBTC: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      PTcornLBTC26DEC2024: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      PTEBTC26DEC2024: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      PTLBTC27MAR2025: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c"
    },
    // [eEthereumNetwork.sepolia]: {
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
  },
};

export default EthLSDConfig;
