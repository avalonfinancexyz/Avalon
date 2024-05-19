import { task } from "hardhat/config";
import {
  ConfigNames,
  configureReservesByHelper,
  eNetwork,
  getReserveAddresses,
  getTreasuryAddress,
  IAaveConfiguration,
  initReservesByHelper,
  loadPoolConfig,
  POOL_ADDRESSES_PROVIDER_ID,
  POOL_DATA_PROVIDER,
  savePoolTokens,
  isL2PoolSupported,
  L2_POOL_IMPL_ID,
  POOL_IMPL_ID,
} from "../../helpers";
import { MARKET_NAME } from "../../helpers/env";
import { POOL_ADMIN } from "./../../helpers/constants";
import { PoolAddressesProvider, Pool } from "../../typechain";
import { waitForTx } from "../../helpers/utilities/tx";
import { getERC20 } from "../../helpers";

task(`add-new-asset`, `add new asset from market config`).setAction(
  async (_, hre) => {
    const network = (
      process.env.FORK ? process.env.FORK : hre.network.name
    ) as eNetwork;
    const { deployer } = await hre.getNamedAccounts();

    const poolConfig = (await loadPoolConfig(
      MARKET_NAME as ConfigNames
    )) as IAaveConfiguration;

    const addressProviderArtifact = await hre.deployments.get(
      POOL_ADDRESSES_PROVIDER_ID
    );

    const addressProvider = (await hre.ethers.getContractAt(
      addressProviderArtifact.abi,
      addressProviderArtifact.address
    )) as PoolAddressesProvider;

    const {
      ATokenNamePrefix,
      StableDebtTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      ReservesConfig,
      RateStrategies,
    } = poolConfig;

    // Deploy Reserves ATokens

    const treasuryAddress = await getTreasuryAddress(poolConfig, network);
    const incentivesController = await hre.deployments.get("IncentivesProxy");
    const reservesAddresses = await getReserveAddresses(poolConfig, network);

    if (Object.keys(reservesAddresses).length == 0) {
      console.warn("[WARNING] Skipping initialization. Empty asset list.");
      return;
    }

    await initReservesByHelper(
      ReservesConfig,
      reservesAddresses,
      ATokenNamePrefix,
      StableDebtTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      deployer,
      treasuryAddress,
      incentivesController.address
    );
    hre.deployments.log(`[Deployment] Initialized all reserves`);

    const tokens = await configureReservesByHelper(ReservesConfig, reservesAddresses);

    if (tokens.length) {
      const aclAdmin = await hre.ethers.getSigner(
        await addressProvider.getACLAdmin()
      );
      const isAdmin = aclAdmin.address == deployer;
      const poolAddress = await addressProvider.getPool();
      const poolArtifact = await hre.deployments.get(
        isL2PoolSupported(poolConfig) ? L2_POOL_IMPL_ID : POOL_IMPL_ID
      );
      const pool = (await hre.ethers.getContractAt(
        poolArtifact.abi,
        await addressProvider.getPool()
      )) as any as Pool;
      for (
        let tokenIndex = 0;
        tokenIndex < tokens.length;
        tokenIndex++
      ) {
        const targetToken = await getERC20(tokens[tokenIndex]);
        if(isAdmin){
          const tokenBalance = await targetToken.balanceOf(deployer);
          const approveTx = await waitForTx(
            await targetToken.approve(
              poolAddress,
              "1111111111111111111111111111"
            )
          );
          console.log(
            `  - Approve ${targetToken} for ${poolAddress}`,
            `\n    - Tx hash: ${approveTx.transactionHash}`
          );
    
          const supplyTx = await waitForTx(
            await pool.supply(
              targetToken.address,
              tokenBalance,
              deployer,
              "0"
            )
          )
          console.log(
            `  - Supply ${targetToken}`,
            `\n    - Tx hash: ${supplyTx.transactionHash}`
          );
          
        } else {
          const tokenBalance = await targetToken.balanceOf(aclAdmin.address);
          console.log(` - Not admin, executed approve from multisig:`, aclAdmin.address);
          const approveCalldata = targetToken.interface.encodeFunctionData(
            "approve",
            [poolAddress, tokenBalance]
          );
          console.log(` - supply ${ tokenBalance }`)
          console.log(" - targetToken: ", targetToken.address);
          console.log(" - Calldata: ", approveCalldata);

          console.log(` - Not admin, executed supply from multisig:`, aclAdmin.address);
          const supplyCalldata = pool.interface.encodeFunctionData(
            "supply",
            [targetToken.address,
              tokenBalance,
              aclAdmin.address,
              "0"
            ]
          );
          console.log(" - poolAddress: ", pool.address);
          console.log(" - Calldata: ", supplyCalldata);
        }
      }
    }

    // Save AToken and Debt tokens artifacts
    const dataProvider = await hre.deployments.get(POOL_DATA_PROVIDER);
    if (POOL_ADMIN[network] == deployer) {
      await savePoolTokens(reservesAddresses, dataProvider.address);
    }

    hre.deployments.log(`[Deployment] Configured all reserves`);
  }
);
