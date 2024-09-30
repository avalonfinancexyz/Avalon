import { task } from "hardhat/config";
import { eNetwork } from "../../helpers";

task(`verify-contracts`).setAction(
  async (_, { deployments, getNamedAccounts, ...hre }) => {
    await hre.run("verify-core");
    await hre.run("verify-market");
    await hre.run("verify-periphery-post");
    await hre.run("verify-periphery");
    await hre.run("verify-tokens");
    await hre.run("verify-impls");
  }
);
