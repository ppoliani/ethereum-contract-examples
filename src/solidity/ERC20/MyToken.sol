pragma solidity ^0.4.15;

contract MyToken {
  mapping (address=> uint256) public balanceOf;
  string public name;
  string public symbol;
  uint8 public decimals;
  
  //  Events
  event Transfer(address indexed from, address indexed to, uint256 value);
  
  function MyToken(uint256 _supply, string _token, string _symbol, uint8 _decimals) {
    if(_supply == 0) _supply = 1000000;

    balanceOf[msg.sender] = _supply;
    name = _token;
    symbol = _symbol;
    decimals = _decimals;
  }

  function transfer(address _to, uint256 _value) {
    // Check that sender has enough tokens and that we don't have an overflow for the receiver
    require(balanceOf[msg.sender] >= _value && balanceOf[_to] + _value >= balanceOf[_to]);
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    Transfer(msg.sender, _to, _value);
  }
}
