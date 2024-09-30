import { task } from "hardhat/config";
import { eNetwork } from "../../helpers";

import {
  DISABLE_ATOKEN_IMPL_ID,
  DISABLE_STABLE_DEBT_TOKEN_IMPL_ID,
  ATOKENV2_IMPL_ID,
  POOL_PROXY_ID,
} from "../../helpers/deploy-ids";
import { POOL_ADMIN } from "../../helpers/constants";
task(`verify-impls`).setAction(
  async (_, { deployments, getNamedAccounts, ...hre }) => {
    const { get } = deployments;
    const { deployer } = await getNamedAccounts();
    const network = hre.network.name as eNetwork;

    const { address: poolAddress } = await deployments.get(POOL_PROXY_ID);

    try {
      console.log(`- Verifying Disable Atoken IMPL`);
      const disableAtoken = await get(DISABLE_ATOKEN_IMPL_ID);
      await hre.run("verify:verify", {
        address: disableAtoken.address,
        constructorArguments: [poolAddress],
      });
    } catch (error) {
      console.error(error);
    }

    try {
      const disableStableDebtTokenArtifact = await get(
        DISABLE_STABLE_DEBT_TOKEN_IMPL_ID
      );
      await hre.run("verify:verify", {
        address: disableStableDebtTokenArtifact.address,
        constructorArguments: [poolAddress],
      });
    } catch (error) {
      console.error(error);
    }

    try {
      const AtokenV2ImplArtifact = await get(ATOKENV2_IMPL_ID);
      await hre.run("verify:verify", {
        address: AtokenV2ImplArtifact.address,
        constructorArguments: [poolAddress],
      });
    } catch (error) {
      console.error(error);
    }
  }
);
