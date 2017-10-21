pragma solidity ^0.4.11;

// Give our DApp a centralized entity that can manage out accounts
// i.e. ability to mint more coins or ban people from using our currency
// This contract will let us perform those tasks
contract Owned {
  address public owner;

  function Owned() {
    owner = msg.sender;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function transferOwnership(address newOwner) onlyOwner {
    owner = newOwner;
  }
}
