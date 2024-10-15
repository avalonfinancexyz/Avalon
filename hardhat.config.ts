import {
  DETERMINISTIC_DEPLOYMENT,
  DETERMINISTIC_FACTORIES,
  ETHERSCAN_KEY,
  getCommonNetworkConfig,
  hardhatNetworkSettings,
  loadTasks,
} from "./helpers/hardhat-config-helpers";
import {
  eArbitrumNetwork,
  eAvalancheNetwork,
  eEthereumNetwork,
  eFantomNetwork,
  eHarmonyNetwork,
  eOptimismNetwork,
  ePolygonNetwork,
  eBaseNetwork,
  eMerlinNetwork,
  eBevmNetwork,
  eBitlayerNetwork,
  eBscNetwork,
  eCoredaoNetwork,
  eBOBNetwork,
  eKlaytnNetwork,
} from "./helpers/types";
import { DEFAULT_NAMED_ACCOUNTS } from "./helpers/constants";

import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "hardhat-dependency-compiler";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-etherscan";

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
const TASK_FOLDERS = ["misc", "market-registry"];

// Prevent to load tasks before compilation and typechain
if (!SKIP_LOAD) {
  loadTasks(TASK_FOLDERS);
}

export default {
  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: false,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
          evmVersion: "berlin",
        },
      },
      {
        version: "0.7.5",
        settings: {
          optimizer: { enabled: true, runs: 100_000 },
        },
      },
    ],
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  networks: {
    hardhat: hardhatNetworkSettings,
    localhost: {
      url: "http://127.0.0.1:8545",
      ...hardhatNetworkSettings,
    },
    tenderly: getCommonNetworkConfig("tenderly", 1),
    main: getCommonNetworkConfig(eEthereumNetwork.main, 1),
    kovan: getCommonNetworkConfig(eEthereumNetwork.kovan, 42),
    rinkeby: getCommonNetworkConfig(eEthereumNetwork.rinkeby, 4),
    ropsten: getCommonNetworkConfig(eEthereumNetwork.ropsten, 3),
    [ePolygonNetwork.polygon]: getCommonNetworkConfig(
      ePolygonNetwork.polygon,
      137
    ),
    [ePolygonNetwork.mumbai]: getCommonNetworkConfig(
      ePolygonNetwork.mumbai,
      80001
    ),
    arbitrum: getCommonNetworkConfig(eArbitrumNetwork.arbitrum, 42161),
    [eArbitrumNetwork.arbitrumTestnet]: getCommonNetworkConfig(
      eArbitrumNetwork.arbitrumTestnet,
      421611
    ),
    [eHarmonyNetwork.main]: getCommonNetworkConfig(
      eHarmonyNetwork.main,
      1666600000
    ),
    [eHarmonyNetwork.testnet]: getCommonNetworkConfig(
      eHarmonyNetwork.testnet,
      1666700000
    ),
    [eAvalancheNetwork.avalanche]: getCommonNetworkConfig(
      eAvalancheNetwork.avalanche,
      43114
    ),
    [eAvalancheNetwork.fuji]: getCommonNetworkConfig(
      eAvalancheNetwork.fuji,
      43113
    ),
    [eFantomNetwork.main]: getCommonNetworkConfig(eFantomNetwork.main, 250),
    [eFantomNetwork.testnet]: getCommonNetworkConfig(
      eFantomNetwork.testnet,
      4002
    ),
    [eOptimismNetwork.testnet]: getCommonNetworkConfig(
      eOptimismNetwork.testnet,
      420
    ),
    [eOptimismNetwork.main]: getCommonNetworkConfig(eOptimismNetwork.main, 10),
    [eEthereumNetwork.goerli]: getCommonNetworkConfig(
      eEthereumNetwork.goerli,
      5
    ),
    [eEthereumNetwork.sepolia]: getCommonNetworkConfig(
      eEthereumNetwork.sepolia,
      11155111
    ),
    [eArbitrumNetwork.goerliNitro]: getCommonNetworkConfig(
      eArbitrumNetwork.goerliNitro,
      421613
    ),
    [eBaseNetwork.base]: getCommonNetworkConfig(eBaseNetwork.base, 8453),
    [eBaseNetwork.baseGoerli]: getCommonNetworkConfig(
      eBaseNetwork.baseGoerli,
      84531
    ),
    [eMerlinNetwork.main]: getCommonNetworkConfig(eMerlinNetwork.main, 4200),
    [eMerlinNetwork.mainUniBTC]: getCommonNetworkConfig(
      eMerlinNetwork.mainUniBTC,
      4200
    ),
    [eMerlinNetwork.mainInn]: getCommonNetworkConfig(
      eMerlinNetwork.mainInn,
      4200
    ),
    [eMerlinNetwork.testnet]: getCommonNetworkConfig(
      eMerlinNetwork.testnet,
      686868
    ),
    [eBevmNetwork.main]: getCommonNetworkConfig(eBevmNetwork.main, 11501),
    [eBevmNetwork.testnet]: getCommonNetworkConfig(eBevmNetwork.testnet, 1501),
    [eBitlayerNetwork.main]: getCommonNetworkConfig(
      eBitlayerNetwork.main,
      200901
    ),
    [eBitlayerNetwork.mainLsd]: getCommonNetworkConfig(
      eBitlayerNetwork.mainLsd,
      200901
    ),
    [eBitlayerNetwork.unibtc]: getCommonNetworkConfig(
      eBitlayerNetwork.unibtc,
      200901
    ),
    [eBitlayerNetwork.mainBRC]: getCommonNetworkConfig(
      eBitlayerNetwork.mainBRC,
      200901
    ),
    [eBitlayerNetwork.testnet]: getCommonNetworkConfig(
      eBitlayerNetwork.testnet,
      200810
    ),

    [eBscNetwork.main]: getCommonNetworkConfig(eBscNetwork.main, 56),
    [eBscNetwork.mainPumpBTC]: getCommonNetworkConfig(
      eBscNetwork.mainPumpBTC,
      56
    ),
    [eBscNetwork.mainStBTC]: getCommonNetworkConfig(eBscNetwork.mainStBTC, 56),
    [eBscNetwork.mainUniBTC]: getCommonNetworkConfig(eBscNetwork.mainUniBTC, 56),
    [eBscNetwork.testnet]: getCommonNetworkConfig(eBscNetwork.testnet, 97),

    [eCoredaoNetwork.main]: getCommonNetworkConfig(eCoredaoNetwork.main, 1116),
    [eCoredaoNetwork.testnet]: getCommonNetworkConfig(
      eCoredaoNetwork.testnet,
      1115
    ),
    [eEthereumNetwork.mainLsd]: getCommonNetworkConfig(
      eEthereumNetwork.mainLsd,
      1
    ),
    [eEthereumNetwork.mainSwell]: getCommonNetworkConfig(
      eEthereumNetwork.mainSwell,
      1
    ),
    [eEthereumNetwork.pumpBTC]: getCommonNetworkConfig(
      eEthereumNetwork.pumpBTC,
      1
    ),

    [eEthereumNetwork.LBTCLSD]: getCommonNetworkConfig(
      eEthereumNetwork.LBTCLSD,
      1
    ),

    [eEthereumNetwork.EBTCLSD]: getCommonNetworkConfig(
      eEthereumNetwork.EBTCLSD,
      1
    ),

    [eBOBNetwork.main]: {
      minGasPrice: 1_000_000,
      ...getCommonNetworkConfig(eBOBNetwork.main, 60808),
    },

    [eKlaytnNetwork.main]: {
      ...getCommonNetworkConfig(eKlaytnNetwork.main, 8217),
    },
    [eKlaytnNetwork.mainStKaia]: {
      ...getCommonNetworkConfig(eKlaytnNetwork.mainStKaia, 8217),
    },
  },
  namedAccounts: {
    ...DEFAULT_NAMED_ACCOUNTS,
  },
  mocha: {
    timeout: 0,
  },
  dependencyCompiler: {
    paths: [
      "contracts/core-v3/contracts/protocol/tokenization/DisableStableDebtToken.sol",
      "@aave/core-v3/contracts/protocol/configuration/PoolAddressesProviderRegistry.sol",
      "@aave/core-v3/contracts/protocol/configuration/PoolAddressesProvider.sol",
      "@aave/core-v3/contracts/misc/AaveOracle.sol",
      "@aave/core-v3/contracts/protocol/tokenization/AToken.sol",
      "@aave/core-v3/contracts/protocol/tokenization/DelegationAwareAToken.sol",
      "@aave/core-v3/contracts/protocol/tokenization/StableDebtToken.sol",
      "@aave/core-v3/contracts/protocol/tokenization/VariableDebtToken.sol",
      "@aave/core-v3/contracts/protocol/libraries/logic/GenericLogic.sol",
      "@aave/core-v3/contracts/protocol/libraries/logic/ValidationLogic.sol",
      "@aave/core-v3/contracts/protocol/libraries/logic/ReserveLogic.sol",
      "@aave/core-v3/contracts/protocol/libraries/logic/SupplyLogic.sol",
      "@aave/core-v3/contracts/protocol/libraries/logic/EModeLogic.sol",
      "@aave/core-v3/contracts/protocol/libraries/logic/BorrowLogic.sol",
      "@aave/core-v3/contracts/protocol/libraries/logic/BridgeLogic.sol",
      "@aave/core-v3/contracts/protocol/libraries/logic/FlashLoanLogic.sol",
      "@aave/core-v3/contracts/protocol/libraries/logic/CalldataLogic.sol",
      "@aave/core-v3/contracts/protocol/pool/Pool.sol",
      "@aave/core-v3/contracts/protocol/pool/L2Pool.sol",
      "@aave/core-v3/contracts/protocol/pool/PoolConfigurator.sol",
      "@aave/core-v3/contracts/protocol/pool/DefaultReserveInterestRateStrategy.sol",
      "@aave/core-v3/contracts/protocol/libraries/aave-upgradeability/InitializableImmutableAdminUpgradeabilityProxy.sol",
      "@aave/core-v3/contracts/dependencies/openzeppelin/upgradeability/InitializableAdminUpgradeabilityProxy.sol",
      "@aave/core-v3/contracts/deployments/ReservesSetupHelper.sol",
      "@aave/core-v3/contracts/misc/AaveProtocolDataProvider.sol",
      "@aave/core-v3/contracts/misc/L2Encoder.sol",
      "@aave/core-v3/contracts/protocol/configuration/ACLManager.sol",
      "@aave/core-v3/contracts/dependencies/weth/WETH9.sol",
      "@aave/core-v3/contracts/mocks/helpers/MockIncentivesController.sol",
      "@aave/core-v3/contracts/mocks/helpers/MockReserveConfiguration.sol",
      "@aave/core-v3/contracts/mocks/oracle/CLAggregators/MockAggregator.sol",
      "@aave/core-v3/contracts/mocks/tokens/MintableERC20.sol",
      "@aave/core-v3/contracts/mocks/flashloan/MockFlashLoanReceiver.sol",
      "@aave/core-v3/contracts/mocks/tokens/WETH9Mocked.sol",
      "@aave/core-v3/contracts/mocks/upgradeability/MockVariableDebtToken.sol",
      "@aave/core-v3/contracts/mocks/upgradeability/MockAToken.sol",
      "@aave/core-v3/contracts/mocks/upgradeability/MockStableDebtToken.sol",
      "@aave/core-v3/contracts/mocks/upgradeability/MockInitializableImplementation.sol",
      "@aave/core-v3/contracts/mocks/helpers/MockPool.sol",
      "@aave/core-v3/contracts/mocks/helpers/MockL2Pool.sol",
      "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20Detailed.sol",
      "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol",
      "@aave/core-v3/contracts/mocks/oracle/PriceOracle.sol",
      "@aave/core-v3/contracts/mocks/tokens/MintableDelegationERC20.sol",
      "@aave/periphery-v3/contracts/misc/UiPoolDataProviderV3.sol",
      "@aave/periphery-v3/contracts/misc/WalletBalanceProvider.sol",
      "@aave/periphery-v3/contracts/misc/WrappedTokenGatewayV3.sol",
      "@aave/periphery-v3/contracts/misc/interfaces/IWETH.sol",
      "@aave/periphery-v3/contracts/misc/UiIncentiveDataProviderV3.sol",
      "@aave/periphery-v3/contracts/rewards/RewardsController.sol",
      "@aave/periphery-v3/contracts/rewards/transfer-strategies/StakedTokenTransferStrategy.sol",
      "@aave/periphery-v3/contracts/rewards/transfer-strategies/PullRewardsTransferStrategy.sol",
      "@aave/periphery-v3/contracts/rewards/EmissionManager.sol",
      "@aave/periphery-v3/contracts/mocks/WETH9Mock.sol",
      "@aave/periphery-v3/contracts/mocks/testnet-helpers/Faucet.sol",
      "@aave/periphery-v3/contracts/mocks/testnet-helpers/TestnetERC20.sol",
      "@aave/periphery-v3/contracts/treasury/Collector.sol",
      "@aave/periphery-v3/contracts/treasury/CollectorController.sol",
      "@aave/periphery-v3/contracts/treasury/AaveEcosystemReserveV2.sol",
      "@aave/periphery-v3/contracts/treasury/AaveEcosystemReserveController.sol",
      "@aave/periphery-v3/contracts/adapters/paraswap/ParaSwapLiquiditySwapAdapter.sol",
      "@aave/periphery-v3/contracts/adapters/paraswap/ParaSwapRepayAdapter.sol",
      "@aave/periphery-v3/contracts/adapters/paraswap/ParaSwapWithdrawSwapAdapter.sol",
      "@aave/safety-module/contracts/stake/StakedAave.sol",
      "@aave/safety-module/contracts/stake/StakedAaveV2.sol",
      "@aave/safety-module/contracts/proposals/extend-stkaave-distribution/StakedTokenV2Rev3.sol",
    ],
  },
  deterministicDeployment: DETERMINISTIC_DEPLOYMENT
    ? DETERMINISTIC_FACTORIES
    : undefined,
  etherscan: {
    apiKey: ETHERSCAN_KEY,
    customChains: [
      {
        network: eBaseNetwork.base,
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org/",
        },
      },
      {
        network: eMerlinNetwork.main,
        chainId: 4200,
        urls: {
          apiURL: "https://scan.merlinchain.io/api/contract",
          browserURL: "https://scan.merlinchain.io/",
        },
      },
      {
        network: eMerlinNetwork.mainUniBTC,
        chainId: 4200,
        urls: {
          apiURL: "https://scan.merlinchain.io/api/contract",
          browserURL: "https://scan.merlinchain.io/",
        },
      },
      {
        network: eMerlinNetwork.mainInn,
        chainId: 4200,
        urls: {
          apiURL: "https://scan.merlinchain.io/api/contract",
          browserURL: "https://scan.merlinchain.io/",
        },
      },
      {
        network: eMerlinNetwork.testnet,
        chainId: 686868,
        urls: {
          apiURL: "https://testnet-scan.merlinchain.io",
          browserURL: "https://testnet-scan.merlinchain.io/",
        },
      },
      {
        network: eBevmNetwork.main,
        chainId: 11501,
        urls: {
          apiURL: "https://evm.chainx.org/",
          browserURL: "https://evm.chainx.org/",
        },
      },
      {
        network: eBitlayerNetwork.main,
        chainId: 200901,
        urls: {
          apiURL: "https://api.btrscan.com/scan/api",
          browserURL: "https://www.btrscan.com/",
        },
      },
      {
        network: eBitlayerNetwork.mainLsd,
        chainId: 200901,
        urls: {
          apiURL: "https://api.btrscan.com/scan/api",
          browserURL: "https://www.btrscan.com/",
        },
      },
      {
        network: eBitlayerNetwork.unibtc,
        chainId: 200901,
        urls: {
          apiURL: "https://api.btrscan.com/scan/api",
          browserURL: "https://www.btrscan.com/",
        },
      },
      {
        network: eBitlayerNetwork.mainBRC,
        chainId: 200901,
        urls: {
          apiURL: "https://api.btrscan.com/scan/api",
          browserURL: "https://www.btrscan.com/",
        },
      },
      {
        network: eBitlayerNetwork.testnet,
        chainId: 200810,
        urls: {
          apiURL: "https://api-testnet.btrscan.com/scan/api",
          browserURL: "https://testnet.btrscan.com/",
        },
      },
      {
        network: eKlaytnNetwork.testnet,
        chainId: 8217,
        urls: {
          apiURL: "https://api-cypress.klaytnscope.com/api",
          browserURL: "https://klaytnscope.com/",
        },
      },
      {
        network: eBOBNetwork.main,
        chainId: 60808,
        urls: {
          apiURL: "https://explorer.gobob.xyz/api",
          browserURL: "https://explorer.gobob.xyz/",
        },
      },
    ],
  },
};
