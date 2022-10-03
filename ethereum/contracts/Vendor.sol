// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

contract Vendor is Ownable {

    Token token;
    uint256 public tokenPerEther = 100;

    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

    constructor(address _tokenAddress) {
        token = Token(_tokenAddress);
    }

    function buyToken() public payable {
        require(msg.value > 0, "You need to send some ETH to proceed.");

        uint256 amountToBuy = msg.value * tokenPerEther;
        uint256 vendorBalance = token.balanceOf(address(this));
        require(vendorBalance >= amountToBuy, "Vendor has insufficient AWT token.");

        (bool success) = token.transfer(msg.sender, amountToBuy);
        require(success, "Failed to transfer token to user.");

        emit BuyTokens(msg.sender, msg.value, amountToBuy);
    }

    function sellToken(uint256 _amountToSell) public {
        require(_amountToSell > 0, "Specify an amount of token greater than zero.");

        uint256 userBalance = token.balanceOf(msg.sender);
        require(userBalance >= _amountToSell, "You have insufficient AWT tokens.");

        uint256 amoutOfETHToTransfer = _amountToSell / tokenPerEther;
        uint256 ownerETHBalance = address(this).balance;
        require(ownerETHBalance >= amoutOfETHToTransfer, "Vendor has insufficient funds.");

        (bool success) = token.transferFrom(msg.sender, address(this), _amountToSell);
        require(success, "Failed to transfer tokens from user to vendor.");

        (success, ) = msg.sender.call{ value: amoutOfETHToTransfer }("");
        require(success, "Failed to send ETH to the user.");
    }

    function withdraw() public onlyOwner {
        uint256 ownerBalance = address(this).balance;
        require(ownerBalance > 0, "No ETH present in the vendor account.");
        (bool success, ) = msg.sender.call{ value: ownerBalance }("");
        require(success, "Failed to withdraw");
    }
}
