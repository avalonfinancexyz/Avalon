// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.10;

import {Ownable} from '@aave/core-v3/contracts/dependencies/openzeppelin/contracts/Ownable.sol';
import {IEACAggregatorProxy} from '@aave/periphery-v3/contracts/misc/interfaces/IEACAggregatorProxy.sol';
import {IEmissionManagerV2} from './interfaces/IEmissionManagerV2.sol';
import {ITransferStrategyBase} from '@aave/periphery-v3/contracts/rewards/interfaces/ITransferStrategyBase.sol';
import {IRewardsControllerV2} from './interfaces/IRewardsControllerV2.sol';
import {RewardsDataTypes} from '@aave/periphery-v3/contracts/rewards/libraries/RewardsDataTypes.sol';

/**
 * @title EmissionManagerV2
 * @author Aave
 * @notice It manages the list of admins of reward emissions and provides functions to control reward emissions.
 */
contract EmissionManagerV2 is Ownable, IEmissionManagerV2 {
  // reward => emissionAdmin
  mapping(address => address) internal _emissionAdmins;

  IRewardsControllerV2 internal _rewardsController;

  /**
   * @dev Only emission admin of the given reward can call functions marked by this modifier.
   **/
  modifier onlyEmissionAdmin(address reward) {
    require(msg.sender == _emissionAdmins[reward], 'ONLY_EMISSION_ADMIN');
    _;
  }

  /**
   * Constructor.
   * @param owner The address of the owner
   */
  constructor(address owner) {
    transferOwnership(owner);
  }

  /// @inheritdoc IEmissionManagerV2
  function configureAssets(RewardsDataTypes.RewardsConfigInput[] memory config) external override {
    for (uint256 i = 0; i < config.length; i++) {
      require(_emissionAdmins[config[i].reward] == msg.sender, 'ONLY_EMISSION_ADMIN');
    }
    _rewardsController.configureAssets(config);
  }

  /// @inheritdoc IEmissionManagerV2
  function setTransferStrategy(
    address reward,
    ITransferStrategyBase transferStrategy
  ) external override onlyEmissionAdmin(reward) {
    _rewardsController.setTransferStrategy(reward, transferStrategy);
  }

  /// @inheritdoc IEmissionManagerV2
  function setRewardOracle(
    address reward,
    IEACAggregatorProxy rewardOracle
  ) external override onlyEmissionAdmin(reward) {
    _rewardsController.setRewardOracle(reward, rewardOracle);
  }

  /// @inheritdoc IEmissionManagerV2
  function setDistributionEnd(
    address asset,
    address reward,
    uint32 newDistributionEnd
  ) external override onlyEmissionAdmin(reward) {
    _rewardsController.setDistributionEnd(asset, reward, newDistributionEnd);
  }

  /// @inheritdoc IEmissionManagerV2
  function setEmissionPerSecond(
    address asset,
    address[] calldata rewards,
    uint88[] calldata newEmissionsPerSecond
  ) external override {
    for (uint256 i = 0; i < rewards.length; i++) {
      require(_emissionAdmins[rewards[i]] == msg.sender, 'ONLY_EMISSION_ADMIN');
    }
    _rewardsController.setEmissionPerSecond(asset, rewards, newEmissionsPerSecond);
  }

  /// @inheritdoc IEmissionManagerV2
  function setClaimer(address user, address claimer) external override onlyOwner {
    _rewardsController.setClaimer(user, claimer);
  }

  /// @inheritdoc IEmissionManagerV2
  function setUpdater(address updater, bool status) external override onlyOwner {
    _rewardsController.setUpdater(updater, status);
  }

  function setBoostConfig(address boostConfig) external onlyOwner {
    _rewardsController.setBoostConfig(boostConfig);
  }

  /// @inheritdoc IEmissionManagerV2
  function setEmissionAdmin(address reward, address admin) external override onlyOwner {
    address oldAdmin = _emissionAdmins[reward];
    _emissionAdmins[reward] = admin;
    emit EmissionAdminUpdated(reward, oldAdmin, admin);
  }

  /// @inheritdoc IEmissionManagerV2
  function setRewardsController(address controller) external override onlyOwner {
    _rewardsController = IRewardsControllerV2(controller);
  }

  /// @inheritdoc IEmissionManagerV2
  function getRewardsController() external view override returns (IRewardsControllerV2) {
    return _rewardsController;
  }

  /// @inheritdoc IEmissionManagerV2
  function getEmissionAdmin(address reward) external view override returns (address) {
    return _emissionAdmins[reward];
  }
}
