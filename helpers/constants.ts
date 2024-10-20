import { parseEther, parseUnits } from "ethers/lib/utils";
import {
  eArbitrumNetwork,
  eAvalancheNetwork,
  eBaseNetwork,
  eEthereumNetwork,
  eFantomNetwork,
  eHarmonyNetwork,
  eOptimismNetwork,
  ePolygonNetwork,
  eMerlinNetwork,
  eBevmNetwork,
  eBitlayerNetwork,
  eBscNetwork,
  eCoredaoNetwork,
  eBOBNetwork,
  eKlaytnNetwork,
  eIotexNetwork,
} from "./types";

const {
  version: coreVersion,
}: {
  version: string;
} = require("@aave/core-v3/package.json");
const {
  version: peripheryVersion,
}: {
  _resolved: string;
  version: string;
} = require("@aave/periphery-v3/package.json");

export const V3_CORE_VERSION = coreVersion;
export const V3_PERIPHERY_VERSION = peripheryVersion;

export const PERCENTAGE_FACTOR = "10000";
export const HALF_PERCENTAGE = "5000";
export const oneEther = parseEther("1");
export const oneRay = parseUnits("1", 27);
export const MAX_UINT_AMOUNT =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ONE_ADDRESS = "0x0000000000000000000000000000000000000001";
export const AAVE_REFERRAL = "0";

export const WRAPPED_NATIVE_TOKEN_PER_NETWORK: { [network: string]: string } = {
  [eEthereumNetwork.kovan]: ZERO_ADDRESS,
  [eEthereumNetwork.main]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  [eArbitrumNetwork.arbitrum]: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  [eArbitrumNetwork.arbitrumTestnet]:
    "0x8592a357252606f5cA2897BD4f500201F7245C28",
  [eOptimismNetwork.main]: "0x4200000000000000000000000000000000000006",
  [eAvalancheNetwork.avalanche]: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
  [eFantomNetwork.main]: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
  [eHarmonyNetwork.main]: "0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a",
  [ePolygonNetwork.polygon]: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
  [eMerlinNetwork.main]: "0xF6D226f9Dc15d9bB51182815b320D3fBE324e1bA",
  [eMerlinNetwork.mainUniBTC]: "0xF6D226f9Dc15d9bB51182815b320D3fBE324e1bA",
  [eMerlinNetwork.mainInn]: "0xF6D226f9Dc15d9bB51182815b320D3fBE324e1bA",
  [eMerlinNetwork.testnet]: "0x67A1f4A939b477A6b7c5BF94D97E45dE87E608eF",
  [eBevmNetwork.main]: "0xB5136FEba197f5fF4B765E5b50c74db717796dcD",
  [eBevmNetwork.testnet]: "0x09Ff8E49D0EA411A3422ed95E8f5497D4241F532",
  [eBitlayerNetwork.main]: "0xfF204e2681A6fA0e2C3FaDe68a1B28fb90E4Fc5F",
  [eBitlayerNetwork.mainLsd]: "0xfF204e2681A6fA0e2C3FaDe68a1B28fb90E4Fc5F",
  [eBitlayerNetwork.unibtc]: "0xfF204e2681A6fA0e2C3FaDe68a1B28fb90E4Fc5F",
  [eBitlayerNetwork.mainBRC]: "0xfF204e2681A6fA0e2C3FaDe68a1B28fb90E4Fc5F",
  [eBitlayerNetwork.testnet]: "0x09Ff8E49D0EA411A3422ed95E8f5497D4241F532",

  [eBscNetwork.main]: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  [eBscNetwork.mainPumpBTC]: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  [eBscNetwork.mainStBTC]: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  [eBscNetwork.mainUniBTC]: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  [eBscNetwork.testnet]: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",

  [eCoredaoNetwork.main]: "0x40375c92d9faf44d2f9db9bd9ba41a3317a2404f",
  [eCoredaoNetwork.testnet]: "0x40375c92d9faf44d2f9db9bd9ba41a3317a2404f",

  [eBOBNetwork.main]: "0x4200000000000000000000000000000000000006",
  [eKlaytnNetwork.main]: "0x19aac5f612f524b754ca7e7c41cbfa2e981a4432",
  [eKlaytnNetwork.mainStKaia]: "0x19aac5f612f524b754ca7e7c41cbfa2e981a4432",

  // iotex
  [eIotexNetwork.main]: "0xa00744882684c3e4747faefd68d283ea44099d03",

  // LSD
  [eEthereumNetwork.mainLsd]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  [eEthereumNetwork.mainSwell]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  [eEthereumNetwork.pumpBTC]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  [eEthereumNetwork.LBTCLSD]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  [eEthereumNetwork.EBTCLSD]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
};

export const ZERO_BYTES_32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export const MOCK_CHAINLINK_AGGREGATORS_PRICES: { [key: string]: string } = {
  AAVE: parseUnits("300", 8).toString(),
  WETH: parseUnits("4000", 8).toString(),
  ETH: parseUnits("4000", 8).toString(),
  DAI: parseUnits("1", 8).toString(),
  USDC: parseUnits("1", 8).toString(),
  USDT: parseUnits("1", 8).toString(),
  WBTC: parseUnits("60000", 8).toString(),
  USD: parseUnits("1", 8).toString(),
  LINK: parseUnits("30", 8).toString(),
  CRV: parseUnits("6", 8).toString(),
  BAL: parseUnits("19.70", 8).toString(),
  REW: parseUnits("1", 8).toString(),
  EURS: parseUnits("1.126", 8).toString(),
  ONE: parseUnits("0.28", 8).toString(),
  WONE: parseUnits("0.28", 8).toString(),
  WAVAX: parseUnits("86.59", 8).toString(),
  WFTM: parseUnits("2.42", 8).toString(),
  WMATIC: parseUnits("1.40", 8).toString(),
  SUSD: parseUnits("1", 8).toString(),
  SUSHI: parseUnits("2.95", 8).toString(),
  GHST: parseUnits("2.95", 8).toString(),
  AGEUR: parseUnits("1.126", 8).toString(),
  JEUR: parseUnits("1.126", 8).toString(),
  DPI: parseUnits("149", 8).toString(),
  CBETH: parseUnits("4000", 8).toString(),
  MBTC: parseUnits("69000", 8).toString(),
  METH: parseUnits("4000", 8).toString(),
  MUSDC: parseUnits("1", 8).toString(),
  MUSDT: parseUnits("1", 8).toString(),
  MORDI: parseUnits("60", 8).toString(),
  MERL: parseUnits("0.4", 8).toString(),
  ORDI: parseUnits("40", 8).toString(),
  MSTONE: parseUnits("4000", 8).toString(),
  POINTS: parseUnits("1", 8).toString(),
  SOLVBTC: parseUnits("1", 8).toString(),
  ESAVAF: parseUnits("1", 8).toString(),
};

export const chainlinkAggregatorProxy: Record<string, string> = {
  main: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  kovan: "0x9326BFA02ADD2366b30bacB125260Af641031331",
  polygon: "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
  mumbai: "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada",
  avalanche: "0x0A77230d17318075983913bC2145DB16C7366156",
  fuji: "0x5498BB86BC934c8D34FDA08E81D444153d0D06aD",
  tenderly: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  arbitrum: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
  "arbitrum-testnet": "0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8",
  rinkeby: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  harmony: "0xdCD81FbbD6c4572A69a534D8b8152c562dA8AbEF",
  optimism: "0xA969bEB73d918f6100163Cd0fba3C586C269bee1",
  fantom: "0xf4766552D15AE4d256Ad41B6cf2933482B0680dc",
  "harmony-testnet": "0xcEe686F89bc0dABAd95AEAAC980aE1d97A075FAD",
  "optimism-testnet": "0xEFFC18fC3b7eb8E676dac549E0c693ad50D1Ce31",
  "fantom-testnet": "0xe04676B9A9A2973BCb0D1478b5E1E9098BBB7f3D",
  ropsten: "0x12BAaa24D85A4A180F0d5ae67b6aCbDDD58968EA",
  goerli: "0x60E4B131f0F219c72b0346675283E73888e4AB24",
  [eArbitrumNetwork.goerliNitro]: "0xC09e69E79106861dF5d289dA88349f10e2dc6b5C",
  [eEthereumNetwork.sepolia]: "0x6c60d915c7a646860dba836ffcb7f112b6cfdc76",

  // BTC feed
  [eMerlinNetwork.main]: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
  [eMerlinNetwork.mainUniBTC]: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
  [eMerlinNetwork.mainInn]: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
  [eMerlinNetwork.testnet]: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",

  [eBevmNetwork.main]: "0xaaF640C5a9Ad6027461b404c32e153591a0B533B",
  [eBevmNetwork.testnet]: "0xaaF640C5a9Ad6027461b404c32e153591a0B533B",

  [eBitlayerNetwork.main]: "0x29304F0c6fd0Db604312d6E982164e1E7C3adAD9",
  [eBitlayerNetwork.mainLsd]: "0x29304F0c6fd0Db604312d6E982164e1E7C3adAD9",
  [eBitlayerNetwork.unibtc]: "0x29304F0c6fd0Db604312d6E982164e1E7C3adAD9",
  [eBitlayerNetwork.mainBRC]: "0x29304F0c6fd0Db604312d6E982164e1E7C3adAD9",
  [eBitlayerNetwork.testnet]: "0x2b3f685266524e921cb5dd3094e57e85a3000487",

  [eBscNetwork.main]: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
  [eBscNetwork.mainPumpBTC]: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
  [eBscNetwork.mainStBTC]: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
  [eBscNetwork.mainUniBTC]: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
  [eBscNetwork.testnet]: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",

  [eCoredaoNetwork.main]: "0x95d43F4Abddb71E03A940d4cd654Da5Ce6768443",
  [eCoredaoNetwork.testnet]: "0x95d43F4Abddb71E03A940d4cd654Da5Ce6768443",

  [eBOBNetwork.main]: "0x97CB85Eb5F892Dd02866672EAB137b3C34501b7b",
  [eKlaytnNetwork.main]: "0x9cc5a6ac600f9558c9f1651d5bd140ce9b56344a",
  [eKlaytnNetwork.mainStKaia]: "0x9cc5a6ac600f9558c9f1651d5bd140ce9b56344a",

  // iotex
  [eIotexNetwork.main]: "0x6717DC0D87a9BD6849F96948c29e8c8875c10096",

  // LSD
  [eEthereumNetwork.mainLsd]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  [eEthereumNetwork.mainSwell]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  [eEthereumNetwork.pumpBTC]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  [eEthereumNetwork.LBTCLSD]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  [eEthereumNetwork.EBTCLSD]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
};

export const chainlinkEthUsdAggregatorProxy: Record<string, string> = {
  main: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  kovan: "0x9326BFA02ADD2366b30bacB125260Af641031331",
  polygon: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
  mumbai: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
  avalanche: "0x976B3D034E162d8bD72D6b9C989d545b839003b0",
  fuji: "0x86d67c3D38D2bCeE722E601025C25a575021c6EA",
  tenderly: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  arbitrum: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
  "arbitrum-testnet": "0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8",
  rinkeby: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  harmony: "0xbaf7C8149D586055ed02c286367A41E0aDA96b7C",
  optimism: "0xA969bEB73d918f6100163Cd0fba3C586C269bee1",
  fantom: "0x11DdD3d147E5b83D01cee7070027092397d63658",
  "harmony-testnet": "0x4f11696cE92D78165E1F8A9a4192444087a45b64",
  "optimism-testnet": "0xEFFC18fC3b7eb8E676dac549E0c693ad50D1Ce31",
  "fantom-testnet": "0xB8C458C957a6e6ca7Cc53eD95bEA548c52AFaA24",
  ropsten: "0x12BAaa24D85A4A180F0d5ae67b6aCbDDD58968EA",
  goerli: "0x60E4B131f0F219c72b0346675283E73888e4AB24",
  [eArbitrumNetwork.goerliNitro]: "0xC09e69E79106861dF5d289dA88349f10e2dc6b5C",
  [eEthereumNetwork.sepolia]: "0x6c60d915c7a646860dba836ffcb7f112b6cfdc76",

  // BTC feed
  [eMerlinNetwork.main]: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
  [eMerlinNetwork.mainUniBTC]: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
  [eMerlinNetwork.mainInn]: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",
  [eMerlinNetwork.testnet]: "0x6717dc0d87a9bd6849f96948c29e8c8875c10096",

  [eBevmNetwork.main]: "0xaaF640C5a9Ad6027461b404c32e153591a0B533B",
  [eBevmNetwork.testnet]: "0xaaF640C5a9Ad6027461b404c32e153591a0B533B",

  [eBitlayerNetwork.main]: "0x29304F0c6fd0Db604312d6E982164e1E7C3adAD9",
  [eBitlayerNetwork.mainLsd]: "0x29304F0c6fd0Db604312d6E982164e1E7C3adAD9",
  [eBitlayerNetwork.unibtc]: "0x29304F0c6fd0Db604312d6E982164e1E7C3adAD9",
  [eBitlayerNetwork.mainBRC]: "0x29304F0c6fd0Db604312d6E982164e1E7C3adAD9",
  [eBitlayerNetwork.testnet]: "0x2b3f685266524e921cb5dd3094e57e85a3000487",

  [eBscNetwork.main]: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
  [eBscNetwork.mainPumpBTC]: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
  [eBscNetwork.mainStBTC]: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
  [eBscNetwork.mainUniBTC]: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
  [eBscNetwork.testnet]: "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",

  [eCoredaoNetwork.main]: "0x95d43F4Abddb71E03A940d4cd654Da5Ce6768443",
  [eCoredaoNetwork.testnet]: "0x95d43F4Abddb71E03A940d4cd654Da5Ce6768443",

  [eBOBNetwork.main]: "0x97CB85Eb5F892Dd02866672EAB137b3C34501b7b",
  [eKlaytnNetwork.main]: "0x9cc5a6ac600f9558c9f1651d5bd140ce9b56344a",
  [eKlaytnNetwork.mainStKaia]: "0x9cc5a6ac600f9558c9f1651d5bd140ce9b56344a",

  // iotex
  [eIotexNetwork.main]: "0x6717DC0D87a9BD6849F96948c29e8c8875c10096",

  // LSD
  [eEthereumNetwork.mainLsd]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  [eEthereumNetwork.mainSwell]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  [eEthereumNetwork.pumpBTC]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  [eEthereumNetwork.LBTCLSD]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  [eEthereumNetwork.EBTCLSD]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
};

export const ETHEREUM_SHORT_EXECUTOR =
  "0xEE56e2B3D491590B5b31738cC34d5232F378a8D5";

export const EMPTY_STORAGE_SLOT =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export const POOL_ADMIN: Record<string, string> = {
  [eArbitrumNetwork.arbitrum]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eAvalancheNetwork.avalanche]: "0xa35b76E4935449E33C56aB24b23fcd3246f13470",
  [eFantomNetwork.main]: "0x39CB97b105173b56b5a2b4b33AD25d6a50E6c949",
  [eHarmonyNetwork.main]: "0xb2f0C5f37f4beD2cB51C44653cD5D84866BDcd2D",
  [eOptimismNetwork.main]: "0xE50c8C619d05ff98b22Adf991F17602C774F785c",
  [ePolygonNetwork.polygon]: "0xdc9A35B16DB4e126cFeDC41322b3a36454B1F772",
  [eEthereumNetwork.main]: ETHEREUM_SHORT_EXECUTOR,
  [eBaseNetwork.base]: "0xA9F30e6ED4098e9439B2ac8aEA2d3fc26BcEbb45",
  [eBaseNetwork.baseGoerli]: "0xA9F30e6ED4098e9439B2ac8aEA2d3fc26BcEbb45",
  [eEthereumNetwork.tenderly]: ETHEREUM_SHORT_EXECUTOR,
  // should be a timelock.
  [eMerlinNetwork.main]: "0x8fD3c4C09BF935ff87E7649020e257aBd46020dA",
  [eMerlinNetwork.mainUniBTC]: "0x8fD3c4C09BF935ff87E7649020e257aBd46020dA",
  [eMerlinNetwork.mainInn]: "0x8fD3c4C09BF935ff87E7649020e257aBd46020dA",
  [eMerlinNetwork.testnet]: "0x513454B3E4A4c9E77740a496A673B36967139269",
  [eBevmNetwork.main]: "0x513454B3E4A4c9E77740a496A673B36967139269",
  [eBevmNetwork.testnet]: "0x513454B3E4A4c9E77740a496A673B36967139269",

  [eBitlayerNetwork.main]: "0xaCbF6b6aFcd32B50238Ed59bD57aDD93E534892E",
  [eBitlayerNetwork.mainLsd]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eBitlayerNetwork.unibtc]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eBitlayerNetwork.mainBRC]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eBitlayerNetwork.testnet]: "0xaCbF6b6aFcd32B50238Ed59bD57aDD93E534892E",

  [eBscNetwork.main]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eBscNetwork.mainPumpBTC]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eBscNetwork.mainStBTC]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eBscNetwork.mainUniBTC]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eBscNetwork.testnet]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",

  [eCoredaoNetwork.main]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eCoredaoNetwork.testnet]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",

  [eBOBNetwork.main]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eKlaytnNetwork.main]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eKlaytnNetwork.mainStKaia]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",

  // iotex
  [eIotexNetwork.main]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",

  [eEthereumNetwork.mainLsd]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eEthereumNetwork.mainSwell]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eEthereumNetwork.pumpBTC]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eEthereumNetwork.LBTCLSD]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eEthereumNetwork.EBTCLSD]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
};

export const EMERGENCY_ADMIN: Record<string, string> = {
  [eArbitrumNetwork.arbitrum]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eAvalancheNetwork.avalanche]: "0xa35b76E4935449E33C56aB24b23fcd3246f13470",
  [eFantomNetwork.main]: "0x39CB97b105173b56b5a2b4b33AD25d6a50E6c949",
  [eHarmonyNetwork.main]: "0xb2f0C5f37f4beD2cB51C44653cD5D84866BDcd2D",
  [eOptimismNetwork.main]: "0xE50c8C619d05ff98b22Adf991F17602C774F785c",
  [ePolygonNetwork.polygon]: "0x1450F2898D6bA2710C98BE9CAF3041330eD5ae58",
  [eEthereumNetwork.main]: ETHEREUM_SHORT_EXECUTOR,
  // should be a timelock.
  [eMerlinNetwork.main]: "0x8fD3c4C09BF935ff87E7649020e257aBd46020dA",
  [eMerlinNetwork.mainUniBTC]: "0x8fD3c4C09BF935ff87E7649020e257aBd46020dA",
  [eMerlinNetwork.mainInn]: "0x8fD3c4C09BF935ff87E7649020e257aBd46020dA",
  [eMerlinNetwork.testnet]: "0x513454B3E4A4c9E77740a496A673B36967139269",
  [eBevmNetwork.main]: "0x513454B3E4A4c9E77740a496A673B36967139269",
  [eBevmNetwork.testnet]: "0x513454B3E4A4c9E77740a496A673B36967139269",

  [eBitlayerNetwork.main]: "0xaCbF6b6aFcd32B50238Ed59bD57aDD93E534892E",
  [eBitlayerNetwork.mainLsd]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eBitlayerNetwork.unibtc]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eBitlayerNetwork.mainBRC]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eBitlayerNetwork.testnet]: "0xaCbF6b6aFcd32B50238Ed59bD57aDD93E534892E",

  [eBscNetwork.main]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eBscNetwork.mainPumpBTC]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eBscNetwork.mainStBTC]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eBscNetwork.mainUniBTC]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eBscNetwork.testnet]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",

  [eCoredaoNetwork.main]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eCoredaoNetwork.testnet]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",

  [eBOBNetwork.main]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eKlaytnNetwork.main]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eKlaytnNetwork.mainStKaia]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",

  // iotex
  [eIotexNetwork.main]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",

  [eEthereumNetwork.mainLsd]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eEthereumNetwork.mainSwell]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eEthereumNetwork.pumpBTC]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eEthereumNetwork.LBTCLSD]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eEthereumNetwork.EBTCLSD]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
};

export const DEFAULT_NAMED_ACCOUNTS = {
  deployer: {
    default: 0,
  },
  aclAdmin: {
    default: 0,
  },
  emergencyAdmin: {
    default: 0,
  },
  poolAdmin: {
    default: 0,
  },
  addressesProviderRegistryOwner: {
    default: 0,
  },
  treasuryProxyAdmin: {
    default: 1,
  },
  incentivesProxyAdmin: {
    default: 1,
  },
  incentivesEmissionManager: {
    default: 0,
  },
  incentivesRewardsVault: {
    default: 0,
  },
};

export const GOVERNANCE_BRIDGE_EXECUTOR: { [key: string]: string } = {
  // [ePolygonNetwork.polygon]: "0xdc9A35B16DB4e126cFeDC41322b3a36454B1F772",
  // [eOptimismNetwork.main]: "0x7d9103572bE58FfE99dc390E8246f02dcAe6f611",
  // [eArbitrumNetwork.arbitrum]: "0x7d9103572bE58FfE99dc390E8246f02dcAe6f611",
};

export const MULTISIG_ADDRESS: { [key: string]: string } = {
  [eArbitrumNetwork.arbitrum]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eAvalancheNetwork.avalanche]: "0xa35b76E4935449E33C56aB24b23fcd3246f13470",
  [eFantomNetwork.main]: "0x39CB97b105173b56b5a2b4b33AD25d6a50E6c949",
  [eHarmonyNetwork.main]: "0xb2f0C5f37f4beD2cB51C44653cD5D84866BDcd2D",
  [eOptimismNetwork.main]: "0xE50c8C619d05ff98b22Adf991F17602C774F785c",
  // Polygon Multisig
  [ePolygonNetwork.polygon]: "0x1450F2898D6bA2710C98BE9CAF3041330eD5ae58",

  // should be a Multisig.
  [eMerlinNetwork.main]: "0x513454B3E4A4c9E77740a496A673B36967139269",
  [eMerlinNetwork.mainUniBTC]: "0x513454B3E4A4c9E77740a496A673B36967139269",
  [eMerlinNetwork.mainInn]: "0x513454B3E4A4c9E77740a496A673B36967139269",
  [eMerlinNetwork.testnet]: "0x513454B3E4A4c9E77740a496A673B36967139269",

  [eBevmNetwork.main]: "0x513454B3E4A4c9E77740a496A673B36967139269",
  [eBevmNetwork.testnet]: "0x513454B3E4A4c9E77740a496A673B36967139269",

  [eBitlayerNetwork.main]: "0xaCbF6b6aFcd32B50238Ed59bD57aDD93E534892E",
  [eBitlayerNetwork.mainLsd]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eBitlayerNetwork.unibtc]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eBitlayerNetwork.mainBRC]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eBitlayerNetwork.testnet]: "0xaCbF6b6aFcd32B50238Ed59bD57aDD93E534892E",

  [eBscNetwork.main]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eBscNetwork.mainPumpBTC]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eBscNetwork.mainStBTC]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eBscNetwork.mainUniBTC]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",
  [eBscNetwork.testnet]: "0x186097b7754d95D0cf011356811A81D4774dA1Dd",

  [eCoredaoNetwork.main]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eCoredaoNetwork.testnet]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",

  [eBOBNetwork.main]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eKlaytnNetwork.mainStKaia]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",

  // iotex
  [eIotexNetwork.main]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",

  // LSD
  [eEthereumNetwork.mainLsd]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eEthereumNetwork.mainSwell]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eEthereumNetwork.pumpBTC]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eEthereumNetwork.LBTCLSD]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
  [eEthereumNetwork.EBTCLSD]: "0xd955F0c167adbf7d553fc4D59A964A1b115Cc093",
};

export const INCENTIVES_REWARDS_VAULT: { [key: string]: string } = {
  // [eMerlinNetwork.main]: "0x513454B3E4A4c9E77740a496A673B36967139269",
  // [eMerlinNetwork.testnet]: "0x513454B3E4A4c9E77740a496A673B36967139269",
};
