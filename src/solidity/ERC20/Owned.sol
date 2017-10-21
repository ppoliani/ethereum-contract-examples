pragma solidity ^0.4.15;

// Give our DApp the ability ti acat as a central manager.
// i.e. ability to mint more coins or ban people from using our currency
// This contract will let us perform those tasks by letting out token contract
// inherit the following memeber and specifically the onlyOwner modifier that will
// let only the owner to perform those taks. Bare in mind that this sort of centralization should
// be deployed in the beginning and everyone should be aware of it before participating in your token.
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
