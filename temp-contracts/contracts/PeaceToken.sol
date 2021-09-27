pragma solidity ^0.5.16;

contract PeaceToken {
    // string name public = "Peace Token";

    uint256 public totalSupply; // The total supply of PeaceTokens
    mapping(address => uint256) public balanceOf;
    string public name = "Peace Token";
    string public symbol = "PEACE";
    string public standard = "Peace Token v1.0";

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    // Constructor
    constructor(uint256 _initialSupply) public {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
    }

    // Transfer Function

    function transfer(address _receiver, uint256 _amount)
        public
        returns (bool sufficient)
    {
        if (balanceOf[msg.sender] < _amount) return false;
        balanceOf[msg.sender] -= _amount;
        balanceOf[_receiver] += _amount;

        // Transfer Event
        Transfer(msg.sender, _receiver, _amount);

        // Return Boolean Value
        return true;
    }

    function getBalance(address addr) public view returns (uint256) {
        return balanceOf[addr];
    }
}
