// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IBoostConfig {
    function getBoostRate(address user) external view returns (uint256);

    function getBoostBasic() external view returns (uint256);

    function getBoostMaxRate() external view returns (uint256);

    function updateUser(address user) external;
}
