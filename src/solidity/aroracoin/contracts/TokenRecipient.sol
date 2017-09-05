pragma solidity ^0.4.11;

// an external contract that will interact with the AroraToken Contract
// because contracts aren't able to subscribe to Events only to function calls
// This is a contract that any third party who want to interact with the Arora tower,
// needs to deploy.
contract TokenRecipient {
  function receiveApproval(address from, uint256 value, address token, bytes extraData);
}
