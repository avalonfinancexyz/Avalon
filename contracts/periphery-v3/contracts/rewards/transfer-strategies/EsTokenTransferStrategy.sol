// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.10;

import {IEsTokenTransferStrategy} from '../interfaces/IEsTokenTransferStrategy.sol';
import {ITransferStrategyBase} from '@aave/periphery-v3/contracts/rewards/interfaces/ITransferStrategyBase.sol';
import {TransferStrategyBase} from '@aave/periphery-v3/contracts/rewards/transfer-strategies/TransferStrategyBase.sol';
import {GPv2SafeERC20} from '@aave/core-v3/contracts/dependencies/gnosis/contracts/GPv2SafeERC20.sol';
import {IMintable} from '../interfaces/IMintable.sol';

/**
 * @title EsTokenTransferStrategy
 * @notice Transfer strategy that pulls ERC20 rewards from an external account to the user address.
 * The external account could be a smart contract or EOA that must approve to the EsTokenTransferStrategy contract address.
 * @author Aave
 **/
contract EsTokenTransferStrategy is TransferStrategyBase, IEsTokenTransferStrategy {
  using GPv2SafeERC20 for IMintable;

  constructor(
    address incentivesController,
    address rewardsAdmin
  ) TransferStrategyBase(incentivesController, rewardsAdmin) {}

  /// @inheritdoc TransferStrategyBase
  function performTransfer(
    address to,
    address reward,
    uint256 amount
  )
    external
    override(TransferStrategyBase, ITransferStrategyBase)
    onlyIncentivesController
    returns (bool)
  {
    IMintable(reward).mint(to, amount);

    return true;
  }
}
