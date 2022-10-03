// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./Property.sol";
import "./Token.sol";

contract Registry {

    using Counters for Counters.Counter;

    Counters.Counter nProperties;
    Property property;
    Token token;
    mapping(uint256 => PropertyInfo) public properties;
    PropertyInfo[] public propertyList;
    Purchase[] public purchases;

    struct PropertyInfo {
        uint256 price;
        string location;
        uint256 size;
        bool isAvailable;
    }

    struct Purchase {
        uint256 pid;
        address buyer;
        address owner;
        uint256 price;
    }

    // events
    event NewPropertyEvent(uint256 id, address owner, uint256 price, string location, uint256 size);
    event BuyProperty(address buyer, uint256 pid, uint256 price);
    event PropertyAvailabilityEvent(uint256 id, bool available);

    constructor(address _propertyContract, address _tokenAddress) {
        nProperties.reset();
        property = Property(_propertyContract);
        token = Token(_tokenAddress);
    }

    function addProperty(uint256 _price, string memory _location, uint256 _size) public {
        uint256 pid = nProperties.current();
        nProperties.increment();
        property.mint(msg.sender, pid);     // minting property non-fungible token

        PropertyInfo memory prop = PropertyInfo(_price, _location, _size, true);
        properties[pid] = prop;
        propertyList.push(prop);   // pushing to an array so that we can fetch the array of properties

        emit NewPropertyEvent(pid, msg.sender, _price, _location, _size);
    }

    function buyProperty(uint256 _pid) public payable {
        address propertyOwner = property.ownerOf(_pid);
        require(msg.sender != propertyOwner, "Property owner cannot buy their own property.");
        require(properties[_pid].isAvailable, "Currently this property is not available.");

        uint256 propertyPrice = properties[_pid].price;

        // this following codes is for transferring ETH
        // require(msg.value == propertyPrice, "Not sufficient fund.");   // checking if buyer is sending exact price amount or not
        // (bool success, ) = address(propertyOwner).call{ value: msg.value }("");
        // require(success, "Failed to send money to the owner.");

        // this following codes is for transferring AWT token
        uint256 userBalance = token.balanceOf(msg.sender);
        require(userBalance >= propertyPrice, "User does not have sufficient AWT tokens.");
        (bool success) = token.transfer(msg.sender, propertyPrice);
        require(success, "Failed to transfer token to user.");

        property.safeTransferFrom(propertyOwner, msg.sender, _pid);   // transferring the property token to the buyer
        properties[_pid].isAvailable = false;   // only after succsfull transaction setting the property is not available
        propertyList[_pid].isAvailable = false;

        Purchase memory purchase = Purchase(_pid, msg.sender, propertyOwner, propertyPrice);
        purchases.push(purchase);   // pushing to the purchase array

        emit BuyProperty(msg.sender, _pid, propertyPrice);
    }

    function setPropertyAvailability(uint256 _pid, bool _status) public {
        require(property.ownerOf(_pid) == msg.sender, "Only owner of the property can update the availability status");
        properties[_pid].isAvailable = _status;
        propertyList[_pid].isAvailable = _status;
        emit PropertyAvailabilityEvent(_pid, _status);
    }

    function getProperties() public view returns(PropertyInfo[] memory) {
        return propertyList;
    }

    function getPurchases() public view returns(Purchase[] memory) {
        return purchases;
    }
}
