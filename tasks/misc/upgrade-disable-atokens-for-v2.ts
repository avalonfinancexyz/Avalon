import { loadPoolConfig } from "./../../helpers/market-config-helpers";
import {
  getAToken,
  getPoolAddressesProvider,
} from "./../../helpers/contract-getters";
import {
  DISABLE_ATOKEN_IMPL_ID,
  INCENTIVESV2_PROXY_ID,
  POOL_ADDRESSES_PROVIDER_ID,
  TREASURY_PROXY_ID,
} from "./../../helpers/deploy-ids";
import { getAddressFromJson } from "./../../helpers/utilities/tx";
import { getAaveProtocolDataProvider } from "../../helpers/contract-getters";
import { waitForTx } from "../../helpers/utilities/tx";
import { getPoolConfiguratorProxy } from "../../helpers/contract-getters";
import { task } from "hardhat/config";
import { FORK } from "../../helpers/hardhat-config-helpers";
import { COMMON_DEPLOY_PARAMS, MARKET_NAME } from "../../helpers/env";

import { ZERO_ADDRESS, DisableATokenV2 } from "../../helpers";

// Returns true if tokens upgraded, false if not

task(`upgrade-disable-atokens-for-v2`)
  .addParam("revision")
  // .addOptionalParam("checkonly")
  .setAction(
    async ({ revision }, { deployments, getNamedAccounts, ...hre }) => {
      const { deployer } = await getNamedAccounts();

      // const checkOnlyReserves: string[] = checkonly ? checkonly.split(",") : [];
      const dataProvider = await getAaveProtocolDataProvider();
      const reserves = await dataProvider.getAllReservesTokens();

      //   const reservesToCheck = checkOnlyReserves.length
      //     ? reserves.filter(([reserveSymbol]) =>
      //         checkOnlyReserves.includes(reserveSymbol)
      //       )
      //     : reserves;

      const network = FORK ? FORK : hre.network.name;

      if (!MARKET_NAME) {
        console.error("Missing MARKET_NAME env variable. Exiting.");
        return false;
      }
      const { ATokenNamePrefix, SymbolPrefix } = await loadPoolConfig(
        MARKET_NAME
      );

      const poolAddressesProvider = await getPoolAddressesProvider(
        await getAddressFromJson(network, POOL_ADDRESSES_PROVIDER_ID)
      );

      const treasury = await getAddressFromJson(network, TREASURY_PROXY_ID);

      const incentivesController = await getAddressFromJson(
        network,
        INCENTIVESV2_PROXY_ID
      );

      const poolConfigurator = await getPoolConfiguratorProxy(
        await poolAddressesProvider.getPoolConfigurator()
      );

      const poolAddress = await poolAddressesProvider.getPool();
      const newAtokenArtifact = await deployments.deploy(
        DISABLE_ATOKEN_IMPL_ID,
        {
          contract: "DisableATokenV2",
          from: deployer,
          args: [poolAddress],
          ...COMMON_DEPLOY_PARAMS,
        }
      );

      const disableATokenV2 = (await hre.ethers.getContractAt(
        newAtokenArtifact.abi,
        newAtokenArtifact.address
      )) as DisableATokenV2;

      if (newAtokenArtifact.newlyDeployed) {
        await waitForTx(
          await disableATokenV2.initialize(
            poolAddress, // initializingPool
            ZERO_ADDRESS, // treasury
            ZERO_ADDRESS, // underlyingAsset
            ZERO_ADDRESS, // incentivesController
            0, // aTokenDecimals
            "ATOKEN_IMPL", // aTokenName
            "ATOKEN_IMPL", // aTokenSymbol
            "0x00" // params
          )
        );
      }

      const deployedRevision = await (
        await (await getAToken(newAtokenArtifact.address)).ATOKEN_REVISION()
      ).toString();
      if (deployedRevision !== revision) {
        console.error(
          `- Deployed AToken implementation revision ${deployedRevision} does not match expected revision ${revision}`
        );
        return false;
      }
      for (let x = 0; x < reserves.length; x++) {
        const [symbol, asset] = reserves[x];

        console.log(`- Updating a${symbol}...`);
        await waitForTx(
          await poolConfigurator.updateAToken({
            asset,
            treasury,
            incentivesController,
            name: `Avalon ${ATokenNamePrefix} ${symbol}`,
            symbol: `a${SymbolPrefix}${symbol}`,
            implementation: newAtokenArtifact.address,
            params: [],
          })
        );
        console.log(`  - Updated implementation of a${symbol}`);
      }
    }
  );
