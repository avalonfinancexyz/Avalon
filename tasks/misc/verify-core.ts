import { task } from "hardhat/config";
import { eNetwork } from "../../helpers";

task(`verify-core`).setAction(
  async (_, { deployments, getNamedAccounts, ...hre }) => {
    const { get } = deployments;
    const { deployer } = await getNamedAccounts();
    const network = hre.network.name as eNetwork;

    console.log(`- Verifying PoolAddressesProviderRegistry`);
    const poolAddressesProviderRegistryArtifact = await get(
      "PoolAddressesProviderRegistry"
    );

    try {
      await hre.run("verify:verify", {
        address: poolAddressesProviderRegistryArtifact.address,
        constructorArguments: [deployer],
      });
    } catch (error) {
      console.error(error);
    }

    console.log(`- Verifying Logic`);

    const supplyLogicArtifact = await get("SupplyLogic");
    try {
      await hre.run("verify:verify", {
        address: supplyLogicArtifact.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.error(error);
    }

    console.log(`- Verifying Logic`);

    const borrowLogicArtifact = await get("BorrowLogic");
    try {
      await hre.run("verify:verify", {
        address: borrowLogicArtifact.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.error(error);
    }

    const liquidationLogicArtifact = await get("LiquidationLogic");
    try {
      await hre.run("verify:verify", {
        address: liquidationLogicArtifact.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.error(error);
    }

    const eModeLogicArtifact = await get("EModeLogic");
    try {
      await hre.run("verify:verify", {
        address: eModeLogicArtifact.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.error(error);
    }

    const bridgeLogicArtifact = await get("BridgeLogic");
    try {
      await hre.run("verify:verify", {
        address: bridgeLogicArtifact.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.error(error);
    }

    const configuratorLogicArtifact = await get("ConfiguratorLogic");
    try {
      await hre.run("verify:verify", {
        address: configuratorLogicArtifact.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.error(error);
    }

    const flashLoanLogicArtifact = await get("FlashLoanLogic");
    try {
      await hre.run("verify:verify", {
        address: flashLoanLogicArtifact.address,
        constructorArguments: [],
        libraries: {
          BorrowLogic: borrowLogicArtifact.address,
        },
      });
    } catch (error) {
      console.error(error);
    }

    const poolLogicLogicArtifact = await get("PoolLogic");
    try {
      await hre.run("verify:verify", {
        address: poolLogicLogicArtifact.address,
        constructorArguments: [],
      });
    } catch (error) {
      console.error(error);
    }
  }
);
