pragma solidity ^0.4.11;

import "./Owned.sol";
import "./TokenRecipient.sol";

contract AroraToken is Owned {
  string public name;
  string public symbol;
  uint8 public decimals;
  uint256 public totalSupply;
  uint256 public sellPrice;
  uint256 public buyPrice;
  uint minBalanceForAccounts = 5 finney;

  mapping (address => uint256) public balanceOf;
  mapping (address => bool) public frozenAccount;
  mapping (address => mapping (address => uint256)) public allowance;


  event Transfer(address indexed from, address indexed to, uint256 value);
  event FrozenAccount(address target, bool isFrozen);
  event Burn(address indexed from, uint256 value);

  function AroraToken(uint256 initialSupply, string _name, string _symbol, uint8 _decimals, address centralMinter) {
    if (centralMinter != 0) {
      owner = centralMinter;
    }

    totalSupply = initialSupply;
    balanceOf[msg.sender] = initialSupply;
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
  }

  function balanceof() returns (uint256 balance) {
    return balanceOf[msg.sender];
  }

  function setPrices(uint256 newSellPrice, uint256 newBuyPrice) onlyOwner {
    sellPrice = newSellPrice;
    buyPrice = newBuyPrice;
  }

  function _transfer(address from, address to, uint256 value) internal {
    require(to != 0x0); // prevent transfer to 0x0 address. Use burn() instead
    require(balanceOf[from] > value); // Has sender enough balance?
    require(balanceOf[to] + value > balanceOf[to]); // check for overflows
    require(!frozenAccount[from]); // is senders account frozen?
    require(!frozenAccount[to]); // is recipient's account frozen?

    balanceOf[msg.sender] -= value;
    balanceOf[to] += value;
    Transfer(from, to, value);
  }

  /// @notice Send `value` tokens to `to` from your account
  /// @param to The address of the recipient
  /// @param value the amount to send
  function transfer(address to, uint256 value) {
    _transfer(msg.sender, to, value);
  }

  /// @notice Send `value` tokens to `to` in behalf of `from`
  /// @param from The address of the sender
  /// @param to The address of the recipient
  /// @param value the amount to send
  function transferFrom(address from, address to, uint256 value) returns (bool success) {
    require(value < allowance[from][msg.sender]); //check allowance
    allowance[from][msg.sender] -= value;
    _transfer(from, to, value);

    return true;
  }

  /// @notice Allows `spender` to spend no more than `value` tokens in your behalf
  /// @param spender The address authorized to spend
  /// @param value the max amount they can spend
  function approve(address spender, uint256 value) returns (bool success) {
    allowance[msg.sender][spender] = value;
    return true;
  }

  /// @notice Allows `_spender` to spend no more than `value` tokens in your behalf, and then ping the contract about it
  /// @param _spender The address authorized to spend
  /// @param value the max amount they can spend
  /// @param extraData some extra information to send to the approved contract
  /// for contracts, you should first approve an amount of tokens they can move from your account and then ping
  /// them to let them know they should do their thing
  function approveAndCall(address _spender, uint256 value, bytes extraData) returns (bool success) {
    TokenRecipient spender = TokenRecipient(_spender);
    if (approve(_spender, value)) {
      spender.receiveApproval(msg.sender, value, this, extraData);
      return true;
    }
  }

  function freezeAccount(address target, bool freeze) onlyOwner {
    frozenAccount[target] = freeze;
    FrozenAccount(target, freeze);
  }

  // Allow owner to create new tokens
  function mintToken(address target, uint256 mintedAmount) onlyOwner {
    balanceOf[target] += mintedAmount;
    totalSupply += mintedAmount;

    Transfer(0, owner, mintedAmount); // notify that new token where created out of thin air
    Transfer(owner, target, mintedAmount); // notify that the newly minted amount was transfered to the target address
  }

  /// @notice Remove `value` tokens from the system irreversibly
  /// @param value the amount of money to burn
  function burn(uint256 value) returns (bool success) {
    require(balanceOf[msg.sender] > value);
    balanceOf[msg.sender] -= value;
    totalSupply -= value;
    Burn(msg.sender, value);

    return true;
  }

  function setMinBalance(uint minimumBalanceInFinney) onlyOwner {
    minBalanceForAccounts = minimumBalanceInFinney * 1 finney;
  }

  function burnFrom(address from, uint256 vlaue) returns (bool success) {
    require(balanceOf[from] >= vlaue);                // Check if the targeted balance is enough
    require(vlaue <= allowance[from][msg.sender]);    // Check allowance
    balanceOf[from] -= vlaue;                         // Subtract from the targeted balance
    allowance[from][msg.sender] -= vlaue;             // Subtract from the sender's allowance
    totalSupply -= vlaue;                              // Update totalSupply
    Burn(from, vlaue);
    return true;
  }

  function buy() payable returns (uint amount) {
    amount = msg.value / buyPrice;
    require(balanceOf[this] >= amount); // do we have enough to sell
    balanceOf[msg.sender] += amount;
    balanceOf[this] -= amount;
    Transfer(this, msg.sender, amount);

    return amount;
  }

  function sell(uint amount) returns (uint revenue) {
    require(balanceOf[msg.sender] >= amount);
    balanceOf[this] += amount;
    balanceOf[msg.sender] -= amount;
    revenue = sellPrice * amount;
    require(msg.sender.send(revenue)); // sends ether to the seller; it's important to do this last to prevent recursion attacks
    Transfer(msg.sender, this, amount);

    return revenue;
  }
 }
