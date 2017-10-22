pragma solidity ^0.4.15;

import "./Owned.sol";
import "./TokenRecipient.sol";
import "./ERC20Interface.sol";

contract AroraERC20 is ERC20Interface, Owned {
  string public name;
  string public symbol;
  uint8 public decimals = 4;
  uint public supply;
  uint public sellPrice;
  uint public buyPrice;

  // If our clients have not enough ethers in their account they won't be able to call some of the methods
  // of this contract. Ideally we don't wont our users to be worried about ethers or blockchain etc.
  // Instead we can auto refill users balance as soon as it detects the balance is low.
  uint minBalanceForAccounts = 5 finney; // 0.005 ether

  mapping (address => uint) public balanceOf;
  mapping (address => bool) public frozenAccounts;
  mapping (address => mapping (address => uint)) public allowance;
  
  //  Events
  event Transfer(address indexed from, address indexed to, uint value);
  event FrozenAccount(address target, bool isFrozen);
  event Approval(address indexed owner, address indexed spender, uint value);
  
  function AroraERC20(uint _supply, string _token, string _symbol, uint8 _decimals) {
    supply = _supply * 10 * uint(_decimals);
    balanceOf[msg.sender] = supply;
    name = _token;
    symbol = _symbol;
  }

  function _transfer(address from, address to, uint value) internal returns (bool success) {
    require(to != 0x0); // prevent transfer to 0x0 address. Use burn() instead
    require(value > 0);
    require(balanceOf[from] > value); // Has sender enough balance?
    require(balanceOf[to] + value > balanceOf[to]); // check for overflows
    require(!frozenAccounts[from]); 
    require(!frozenAccounts[to]); 

    balanceOf[from] -= value;
    balanceOf[to] += value;

    Transfer(from, to, value);

    return true;
  }

  function _autoRefillIfNeed() internal {
    if(msg.sender.balance < minBalanceForAccounts) {
      // sell the following amount so you can fund the execution of the invoked method
      sell((minBalanceForAccounts - msg.sender.balance) / sellPrice);
    }
  }

  function totalSupply() constant returns (uint) {
    return supply;
  }

  function allowance(address owner, address spender) constant returns (uint remaining) {
    return allowance[owner][spender];
  }

  function balanceOf(address owner) constant returns (uint balance) {
    if(owner != 0) {
      return balanceOf[msg.sender]; 
    }
    else { 
      return balanceOf[owner];
    }
  }

  /// @notice Send `value` tokens to `to` from your account
  /// @param to The address of the recipient
  /// @param value the amount to send
  function transfer(address to, uint value) returns (bool sucess) {
    _autoRefillIfNeed();
    return _transfer(msg.sender, to, value);
  }

  /// @notice Send `value` tokens to `to` on behalf of `from`
  /// @param from The address of the sender
  /// @param to The address of the recipient
  /// @param value the amount to send
  function transferFrom(address from, address to, uint value) returns (bool success) {
    require(value <= allowance[from][msg.sender]);
    allowance[from][msg.sender] -= value;
    _transfer(from, to, value);
    return true;
  }

  /// @notice Allows `spender` to spend no more than `value` tokens on your behalf
  /// @param spender The address authorized to spend
  /// @param value the max amount they can spend
  function approve(address spender, uint value) returns (bool success) {
    allowance[msg.sender][spender] = value;
    Approval(msg.sender, spender, value);
    return true;
  }

  /// @notice Allows `_spender` to spend no more than `value` tokens in your behalf, and then ping the contract about it
  /// @param _spender The address authorized to spend
  /// @param value the max amount they can spend
  /// @param extraData some extra information to send to the approved contract
  /// for contracts, you should first approve an amount of tokens they can move from your account and then ping
  /// them to let them know they should do their thing
  function approveAndCall(address _spender, uint value, bytes extraData) returns (bool success) {
    TokenRecipient spender = TokenRecipient(_spender);

    if(approve(_spender, value)) {
      spender.receiveApproval(msg.sender, value, this, extraData);
      return true;
    }
  }

  // Allow owner to create new tokens; i.e. create new tokens from a thin air
  function mintToken(address target, uint amount) onlyOwner {
    balanceOf[target] += amount;
    supply += amount;

    Transfer(0, owner, amount); 
    Transfer(owner, target, amount);
  }

  /// @notice Freeze the `target` address
  function freezeAccount(address target, bool freeze) onlyOwner {
    frozenAccounts[target] = freeze;
    FrozenAccount(target, freeze);
  }

  /// @notice FreSet the new `newSellPrice` and `newBuyPrice`
  function setPrices(uint newSellPrice, uint newBuyPrice) onlyOwner {
    sellPrice = newSellPrice;
    buyPrice = newBuyPrice;
  }

  function buy() payable returns (uint amount) {
    amount = msg.value / buyPrice;
    require(balanceOf[this] >= amount); 
    balanceOf[msg.sender] += amount;
    balanceOf[this] -= amount;

    Transfer(this, msg.sender, amount);
    return amount;
  }

  function sell(uint amount) returns (uint revenue) {
    require(balanceOf[msg.sender] >= amount);
    balanceOf[this] += amount;
    balanceOf[msg.sender] -= amount;
    revenue = amount * sellPrice;

    // it is importatnt that we run this last to avoid recursive attacks i.e. DAO hack
    // Also make sure the contract have enough ethers so it can actually send ethers to other accounts
    // and the following command doesn't fail
    require(msg.sender.send(revenue)); 
    Transfer(msg.sender, this, amount);
    return revenue;
  }

  /// @notice Set the min balance to `minimumBalanceInFinney`
  function setMinBalance(uint minimumBalanceInFinney) onlyOwner {
    minBalanceForAccounts = minimumBalanceInFinney * 1 finney;
  }
}
