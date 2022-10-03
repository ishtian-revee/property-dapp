// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

abstract contract ERC20Token {
    function name() public virtual view returns (string memory);
    function symbol() public virtual view returns (string memory);
    function decimals() public virtual view returns (uint8);
    function totalSupply() public virtual view returns (uint256);
    function balanceOf(address _owner) public virtual view returns (uint256 balance);
    function transfer(address _to, uint256 _value) public virtual returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) public virtual returns (bool success);
    // function approve(address _spender, uint256 _value) public virtual returns (bool success);
    // function allowance(address _owner, address _spender) public virtual view returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

contract Owned {
    address public owner;
    address public newOwner;

    event OwnershipTransferred(address indexed _from, address indexed _to);

    constructor() {
        owner = msg.sender;
    }

    function transferOwnership(address _to) public {
        require(msg.sender == owner, "Only current owner can transfer");
        newOwner = _to;
    }

    function acceptOwnership() public {
        require(msg.sender == newOwner, "Only new owner can accept");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
        newOwner = address(0);
    }
}

contract Token is ERC20Token, Owned {

    string public _name;
    string public _symbol;
    uint8 public _decimal;
    uint256 public _totalSupply;
    address public _minter;

    mapping(address => uint256) balances;

    constructor() {
        _name = "Awesome Token";
        _symbol = "AWT";
        _decimal = 0;
        _totalSupply = 1000;
        _minter = 0x4cFFF76D3c45949da87eceFECACDC00a06c70769;
        balances[_minter] = _totalSupply;
        emit Transfer(address(0), _minter, _totalSupply);
    }

    function name() public override view returns (string memory) {
        return _name;
    }

    function symbol() public override view returns (string memory) {
        return _symbol;
    }

    function decimals() public override view returns (uint8) {
        return _decimal;
    }

    function totalSupply() public override view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address _owner) public override view returns (uint256 balance) {
        return balances[_owner];
    }

    function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success) {
        require(balances[_from] >= _value, "Not enough fund");
        balances[_from] -= _value;
        balances[_to] += _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    function transfer(address _to, uint256 _value) public override returns (bool success) {
        return transferFrom(msg.sender, _to, _value);
    }

    // function approve(address _spender, uint256 _value) public override pure returns (bool success) {
    //     return true;
    // }

    // function allowance(address _owner, address _spender) public override pure returns (uint256 remaining) {
    //     return 0;
    // }

    function mint(uint256 _amount) public returns(bool) {
        require(msg.sender == _minter, "Only minter can mint");
        balances[_minter] += _amount;
        _totalSupply += _amount;
        return true;
    }

    function confiscate(address _target, uint256 _amount) public returns(bool) {
        require(msg.sender == _minter, "Only minter can confiscate");
        if (balances[_target] >= _amount) {
            balances[_target] -= _amount;
            _totalSupply -= _amount;
        } else {
            _totalSupply -= balances[_target];
            balances[_target] = 0;
        }
        return true;
    }
}
