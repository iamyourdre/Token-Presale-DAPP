// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Presale is Ownable {
    SimpleToken public token;
    uint256 public rate = 1000;
    uint256 public weiRaised;

    event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

    constructor(SimpleToken _token) {
        token = _token;
    }

    receive() external payable {
        buyTokens(msg.sender);
    }

    function buyTokens(address beneficiary) public payable {
        uint256 weiAmount = msg.value;
        require(beneficiary != address(0), "Beneficiary address cannot be zero");
        require(weiAmount != 0, "Wei amount cannot be zero");

        uint256 tokens = weiAmount * rate;
        weiRaised += weiAmount;

        token.transfer(beneficiary, tokens);
        emit TokensPurchased(msg.sender, beneficiary, weiAmount, tokens);

        payable(owner()).transfer(msg.value);
    }
}