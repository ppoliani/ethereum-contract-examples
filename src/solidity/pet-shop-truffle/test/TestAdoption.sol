pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
  Adoption adoption = Adoption(DeployedAddresses.Adoption());

  function testUserCanAdoptPet() {
    uint result = adoption.adopt(8);
    Assert.equal(result, 8, "Adoption of pet ID 8 should be recorded.");
  }

  function testGetAdopterAddressByPetId() {
    address expected = this;
    address adopter = adoption.adopters(8);

    Assert.equal(expected, adopter, "Owner of pet ID 8 should be recorded.");
  }

  function testGetAdopterAddressByPetIdInArray() {
    address expected = this;
    address[16] memory adopters = adoption.getAdopters();

    Assert.equal(expected, adopters[8],  "Owner of pet ID 8 should be recorded.");
  }
}
