pragma solidity ^0.4.15;

interface ERC20Interface {
  // Get the total token supply
  function totalSupply() constant returns (uint supply);

  // Get the account balance of another account with address owner
  function balanceOf(address owner) constant returns (uint balance);

  // Send value amount of tokens to address to
  function transfer(address to, uint value) returns (bool success);

  // Send value amount of tokens from address from to address to
  function transferFrom(address from, address to, uint value) returns (bool success);

  // Allow spender to withdraw from your account, multiple times, up to the value amount.
  // If this function is called again it overwrites the current allowance with value.
  // this function is required for some DEX functionality
  function approve(address spender, uint value) returns (bool success);

  // Returns the amount which spender is still allowed to withdraw from owner
  function allowance(address owner, address spender) constant returns (uint remaining);

  // Triggered when tokens are transferred.
  event Transfer(address indexed from, address indexed to, uint value);

  // Triggered whenever approve(address spender, uint value) is called.
  event Approval(address indexed owner, address indexed spender, uint value);
}
