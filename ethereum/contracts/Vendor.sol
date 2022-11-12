// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

contract Vendor is Ownable {

    Token token;                            // refers to our custom AWT ERC20 token
    uint256 public tokenPerEther = 100;     // 1 ETH = 100 AWT

    struct Purchase {
        string purchaseType;
        address from;
        address buyer;
        uint256 amount;
        uint256 time;
    }

    Purchase[] public purchases;

    event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

    constructor(address _tokenAddress) {
        require(_tokenAddress != address(0), "Specify proper AWT token contract address.");
        token = Token(_tokenAddress);
    }

    function buyToken() public payable {
        require(msg.value > 0, "You need to send some ETH to proceed.");

        uint256 amountToBuy = (msg.value * tokenPerEther) / (1 ether);    // Ex: 10 AWT = 0.1 ETH * 100
        uint256 vendorBalance = token.balanceOf(address(this));           // getting vendor contract balance of AWT
        require(vendorBalance >= amountToBuy, "Vendor has insufficient AWT token.");

        (bool success) = token.transfer(msg.sender, amountToBuy);         // transferring AWT to the buyer account
        require(success, "Failed to transfer token to user.");

        Purchase memory purchase = Purchase("BUY", address(this), msg.sender, amountToBuy, block.timestamp);
        purchases.push(purchase);

        emit BuyTokens(msg.sender, msg.value, amountToBuy);               // recording buy token event
    }

    function sellToken(uint256 _amountToSell) public {
        require(_amountToSell > 0, "Specify an amount of token greater than zero.");

        uint256 userBalance = token.balanceOf(msg.sender);      // getting seller contract balance of AWT
        require(userBalance >= _amountToSell, "You have insufficient AWT tokens.");

        uint256 amoutOfETHToTransfer = (_amountToSell * 1 ether) / tokenPerEther;       // converting to ETH
        uint256 ownerETHBalance = address(this).balance;                    // getting the ETH balance of this vendor contract
        require((ownerETHBalance * 1 ether) >= amoutOfETHToTransfer, "Vendor has insufficient funds.");

        (bool success) = token.transferFrom(msg.sender, address(this), _amountToSell);      // transferring AWT from seller account to vendor account
        require(success, "Failed to transfer tokens from user to vendor.");

        (success, ) = msg.sender.call{ value: amoutOfETHToTransfer }("");       // transferring ETH to seller account
        require(success, "Failed to send ETH to the user.");

        Purchase memory purchase = Purchase("SELL", msg.sender, address(this), _amountToSell, block.timestamp);
        purchases.push(purchase);
    }

    // only owner of the vendor contract can withdraw
    function withdraw() public onlyOwner {
        uint256 ownerBalance = address(this).balance;
        require(ownerBalance > 0, "No ETH present in the vendor account.");
        (bool success, ) = msg.sender.call{ value: ownerBalance }("");          // transferring ETH from vender contract to owner account
        require(success, "Failed to withdraw");
    }

    // returns token name, token symbol, token decimals, token total supply, minter account address, vendor token balance, my (msg.sender) balance, vendor wallet balance
    function getSummary() public view returns(string memory, string memory, uint8, uint256, address, uint256, uint256, uint256) {
        return (
            token.name(),
            token.symbol(),
            token.decimals(),
            token.totalSupply(),
            token.minter(),
            token.balanceOf(address(this)),
            token.balanceOf(msg.sender),
            address(this).balance
        );
    }

    function getPurchases() public view returns(Purchase[] memory) {
        return purchases;
    }
}
