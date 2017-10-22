pragma solidity ^0.4.15;

// an external contract that will interact with the AroraToken Contract
// because contracts aren't able to subscribe to Events only to function calls
// This is a contract that any third party who wants to interact with the AroraToken,
// needs to deploy.
interface TokenRecipient {
  function receiveApproval(address from, uint value, address token, bytes extraData);
}
