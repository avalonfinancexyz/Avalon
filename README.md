# Avalon Deployments

This Node.js repository contains the configuration and deployment scripts for the Avalon protocol core and periphery contracts. The repository makes use of `hardhat` and `hardhat-deploy` tools to facilitate the deployment of Avalon protocol.

## Requirements

- Node.js >= 16
- Alchemy key
  - If you use a custom RPC node, you can change the default RPC provider URL at [./helpers/hardhat-config-helpers.ts:25](./helpers/hardhat-config-helpers.ts).
- Etherscan API key _(Optional)_
