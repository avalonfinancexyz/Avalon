import { task } from "hardhat/config";
import { eNetwork } from "../../helpers";

import {
  TREASURY_PROXY_ID,
  TREASURY_CONTROLLER_ID,
  TREASURY_IMPL_ID,
} from "../../helpers/deploy-ids";
import { POOL_ADMIN } from "./../../helpers/constants";
task(`verify-periphery`).setAction(
  async (_, { deployments, getNamedAccounts, ...hre }) => {
    const { get } = deployments;
    const { deployer } = await getNamedAccounts();
    const network = hre.network.name as eNetwork;
    let treasuryOwner = POOL_ADMIN[network];

    console.log(`- Verifying InitializableAdminUpgradeabilityProxy`);
    const treasuryArtifact = await get(TREASURY_PROXY_ID);

    try {
      await hre.run("verify:verify", {
        address: treasuryArtifact.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.error(error);
    }

    const treasuryControllerArtifact = await get(TREASURY_CONTROLLER_ID);

    try {
      await hre.run("verify:verify", {
        address: treasuryControllerArtifact.address,
        constructorArguments: [treasuryOwner],
      });
    } catch (error) {
      console.error(error);
    }

    const treasuryImplArtifact = await get(TREASURY_IMPL_ID);

    try {
      await hre.run("verify:verify", {
        address: treasuryImplArtifact.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.error(error);
    }
  }
);
