import { task } from "hardhat/config";
import { eNetwork } from "../../helpers";

import { POOL_PROXY_ID } from "../../helpers/deploy-ids";
import {
  WRAPPED_NATIVE_TOKEN_PER_NETWORK,
  chainlinkAggregatorProxy,
  chainlinkEthUsdAggregatorProxy,
} from "../../helpers/constants";
task(`verify-periphery-post`).setAction(
  async (_, { deployments, getNamedAccounts, ...hre }) => {
    const { get } = deployments;
    const { deployer } = await getNamedAccounts();
    const network = hre.network.name as eNetwork;

    const { address: poolAddress } = await deployments.get(POOL_PROXY_ID);
    const wrappedNativeTokenAddress = WRAPPED_NATIVE_TOKEN_PER_NETWORK[network];

    console.log(`- Verifying WrappedTokenGatewayV3`);
    const wrappedTokenGatewayV3Artifact = await get("WrappedTokenGatewayV3");

    try {
      await hre.run("verify:verify", {
        address: wrappedTokenGatewayV3Artifact.address,
        constructorArguments: [
          wrappedNativeTokenAddress,
          deployer,
          poolAddress,
        ],
      });
    } catch (error) {
      console.error(error);
    }

    console.log(`- Verifying WalletBalanceProvider`);
    const walletBalanceProviderArtifact = await get("WalletBalanceProvider");

    try {
      await hre.run("verify:verify", {
        address: walletBalanceProviderArtifact.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.error(error);
    }

    console.log(`- Verifying UiIncentiveDataProviderV3`);
    const uiIncentiveDataProviderV3Artifact = await get("UiIncentiveDataProviderV3");

    try {
      await hre.run("verify:verify", {
        address: uiIncentiveDataProviderV3Artifact.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.error(error);
    }

    console.log(`- Verifying UiPoolDataProviderV3`);
    const uiPoolDataProviderV3Artifact = await get("UiPoolDataProviderV3");

    try {
      await hre.run("verify:verify", {
        address: uiPoolDataProviderV3Artifact.address,
        constructorArguments: [
          chainlinkAggregatorProxy[network],
          chainlinkEthUsdAggregatorProxy[network],
        ],
      });
    } catch (error) {
      console.error(error);
    }

    
  }
);
