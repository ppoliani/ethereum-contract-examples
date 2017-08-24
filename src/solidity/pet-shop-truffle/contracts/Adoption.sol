pragma solidity ^0.4.11;

contract Adoption {
  address[16] public adopters;

  function adopt(uint petId) returns (uint) {
    require(petId >= 0 && petId <= 15);

    adopters[petId] = msg.sender;
    return petId;
  }

  function getAdopters() returns (address[16]) {
    return adopters;
  }
}
