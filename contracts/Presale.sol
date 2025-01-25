// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Token.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Presale is Ownable {
    SimpleToken public token;
    uint256 public rate;
    address payable public wallet;

    event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

    constructor(uint256 _rate, address payable _wallet, SimpleToken _token) {
        require(_rate > 0, "Presale: rate is 0");
        require(_wallet != address(0), "Presale: wallet is the zero address");
        require(address(_token) != address(0), "Presale: token is the zero address");

        rate = _rate;
        wallet = _wallet;
        token = _token;
    }

    receive() external payable {
        buyTokens(msg.sender);
    }

    function buyTokens(address beneficiary) public payable {
        uint256 weiAmount = msg.value;
        _preValidatePurchase(beneficiary, weiAmount);

        uint256 tokens = _getTokenAmount(weiAmount);

        wallet.transfer(msg.value);
        token.mint(beneficiary, tokens);

        emit TokensPurchased(msg.sender, beneficiary, weiAmount, tokens);
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal pure {
        require(beneficiary != address(0), "Presale: beneficiary is the zero address");
        require(weiAmount != 0, "Presale: weiAmount is 0");
    }

    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return weiAmount * rate;
    }
}