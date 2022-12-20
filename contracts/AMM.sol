// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import './Token.sol';

contract AMM {
    Token public token1;
    Token public token2;

    constructor(Token _token1, Token _token2) {
        token1 = _token1;
        token2 = _token2;
    }

    function addLiquidity(
        uint256 _token1Amount,
        uint256 _token2Amount
    ) external {
        // Deposit Tokens
        token1.transferFrom(msg.sender, address(this), _token1Amount);
        token2.transferFrom(msg.sender, address(this), _token2Amount);
    }
}
