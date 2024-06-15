import { getParamPerNetwork } from "./../../helpers/market-config-helpers";
import { EMPTY_STORAGE_SLOT, ZERO_ADDRESS } from "./../../helpers/constants";
import {
  EMISSION_MANAGER_V2_ID,
  INCENTIVES_STAKED_TOKEN_STRATEGY_ID,
  POOL_ADDRESSES_PROVIDER_ID,
  STAKE_AAVE_PROXY,
} from "./../../helpers/deploy-ids";
import {
  EmissionManagerV2,
  PoolAddressesProvider,
  RewardsController,
} from "../../typechain";
import { V3_PERIPHERY_VERSION } from "../../helpers/constants";
import {
  INCENTIVES_ES_TOKEN_STRATEGY_ID,
  INCENTIVES_PULL_REWARDS_STRATEGY_ID,
  INCENTIVES_V3_IMPL_ID,
  INCENTIVESV2_PROXY_ID,
} from "../../helpers/deploy-ids";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { COMMON_DEPLOY_PARAMS } from "../../helpers/env";
import {
  ConfigNames,
  eNetwork,
  getContract,
  loadPoolConfig,
  waitForTx,
} from "../../helpers";
import { MARKET_NAME } from "../../helpers/env";

/**
 * @notice An incentives proxy can be deployed per network or per market.
 * You need to take care to upgrade the incentives proxy to the desired implementation,
 * following the IncentivesController interface to be compatible with ATokens or Debt Tokens.
 */
const func: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  ...hre
}: HardhatRuntimeEnvironment) {
  const { save, deploy } = deployments;
  const network = (
    process.env.FORK ? process.env.FORK : hre.network.name
  ) as eNetwork;
  const isLive = hre.config.networks[network].live;
  const { deployer, incentivesRewardsVault, incentivesEmissionManager } =
    await getNamedAccounts();

  const poolConfig = await loadPoolConfig(MARKET_NAME as ConfigNames);

  const proxyArtifact = await deployments.getExtendedArtifact(
    "InitializableImmutableAdminUpgradeabilityProxy"
  );

  const { address: addressesProvider } = await deployments.get(
    POOL_ADDRESSES_PROVIDER_ID
  );

  const addressesProviderInstance = (
    await getContract("PoolAddressesProvider", addressesProvider)
  ).connect(await hre.ethers.getSigner(deployer)) as PoolAddressesProvider;

  // Deploy EmissionManagerV2
  const emissionManagerV2Artifact = await deploy(EMISSION_MANAGER_V2_ID, {
    from: deployer,
    contract: "EmissionManagerV2",
    args: [deployer],
    ...COMMON_DEPLOY_PARAMS,
  });
  const emissionManagerV2 = (await hre.ethers.getContractAt(
    emissionManagerV2Artifact.abi,
    emissionManagerV2Artifact.address
  )) as EmissionManagerV2;

  // Deploy Incentives Implementation
  const incentivesV2ImplArtifact = await deploy(INCENTIVES_V3_IMPL_ID, {
    from: deployer,
    contract: "RewardsControllerV2",
    args: [emissionManagerV2Artifact.address],
    ...COMMON_DEPLOY_PARAMS,
  });
  const incentivesV2Impl = (await hre.ethers.getContractAt(
    incentivesV2ImplArtifact.abi,
    incentivesV2ImplArtifact.address
  )) as RewardsController;

  // Call to initialize at implementation contract to prevent others.
  // await waitForTx(await incentivesV2Impl.initialize(ZERO_ADDRESS));

  // The Rewards Controller must be set at PoolAddressesProvider with id keccak256("INCENTIVES_CONTROLLER"):
  // 0x703c2c8634bed68d98c029c18f310e7f7ec0e5d6342c590190b3cb8b3ba54532
  const incentivesV2ControllerId = hre.ethers.utils.keccak256(
    hre.ethers.utils.toUtf8Bytes("INCENTIVES_CONTROLLER")
  );

  // const isRewardsProxyReady =
  //   (await addressesProviderInstance.getAddress(incentivesV2ControllerId)) !==
  //   ZERO_ADDRESS;
  // if (isRewardsProxyReady) {
  //   const removeProxy = await waitForTx(
  //     await addressesProviderInstance.setAddress(
  //       incentivesV2ControllerId,
  //       ZERO_ADDRESS
  //     )
  //   );
  //   deployments.log("- removeProxy Tx hash:", removeProxy.transactionHash);
  // }

  const setRewardsAsProxyTx = await waitForTx(
    await addressesProviderInstance.setAddressAsProxy(
      incentivesV2ControllerId,
      incentivesV2Impl.address
    )
  );

  const proxyAddress = await addressesProviderInstance.getAddress(
    incentivesV2ControllerId
  );
  await save(INCENTIVESV2_PROXY_ID, {
    ...proxyArtifact,
    address: proxyAddress,
  });

  deployments.log(
    `[Deployment] Attached Rewards implementation and deployed proxy contract: `
  );
  deployments.log("- Tx hash:", setRewardsAsProxyTx.transactionHash);

  const { address: rewardsProxyAddress } = await deployments.get(
    INCENTIVESV2_PROXY_ID
  );

  // Init RewardsController address
  await waitForTx(
    await emissionManagerV2.setRewardsController(rewardsProxyAddress)
  );

  if (!isLive) {
    await deploy(INCENTIVES_PULL_REWARDS_STRATEGY_ID, {
      from: deployer,
      contract: "PullRewardsTransferStrategy",
      args: [
        rewardsProxyAddress,
        incentivesEmissionManager,
        incentivesRewardsVault,
      ],
      ...COMMON_DEPLOY_PARAMS,
    });

    await deploy(INCENTIVES_ES_TOKEN_STRATEGY_ID, {
      from: deployer,
      contract: "EsTokenTransferStrategy",
      args: [rewardsProxyAddress, incentivesEmissionManager],
      ...COMMON_DEPLOY_PARAMS,
    });
  }

  // Transfer emission manager ownership

  await waitForTx(
    await emissionManagerV2.transferOwnership(incentivesEmissionManager)
  );

  return true;
};

func.id = `IncentivesV2:${MARKET_NAME}:aave-v3-periphery@${V3_PERIPHERY_VERSION}`;

func.tags = ["boost", "IncentivesV2Proxy"];
func.dependencies = [];

export default func;
