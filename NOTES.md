# Adding ethereum toolset to your machine

   - We can either follow the instuctions here https://ethereum.org/cli OR
   - If we decide to install the Mist (Ethereum Wallet) then we can use the **geth** binary that comes with it. Inorder to make it available in the terminal we should add it to the $PATH

   ```
   export PATH=$PATH:$HOME/Library/Application\ Support/Ethereum\ Wallet/binaries/Geth/unpacked
   ```

# Development

While developing and testing it is better to use a fast Ethereum node. You can use the *ethereum-testrpc*

## Instructions

### Install TestRpc
`npm i -g ethereumjs-testrpc`

### Start the private testnet:
`testrpc`

If you want to kill the process in the terminal then ctrl+c might to always work. You can simply kill all node process (testrpc is essentially a nodejs process).

### Open your client
  - For the Ethereum wallet you can run

    ```
    open -a /Applications/Ethereum\ Wallet.app --args --rpc http://localhost:8545
    ```

  - For the Metamask wallet

    1) Open the Chrome extension
    2) Connect to the localhost:8545 network
    3) Add a new account by copying the private of one of the accounts that testrpc created for us. Private keys will be available in the terminal when you start the testrpc


# Troubleshooting

  - There is curerntly an issue when we run a testnet with `testrpc` in conjuction with the Ethereum (Mist) wallet. It seems that we cannot use the account created by the testrpc to deploy or send transactions.

  ### Solutions

  1) Create a new account using `geth`

  ```geth account new```

  2) copy the key i.e. 513e7364b492a71f6f6f277ea9ef008ca0b74bfd
  3) Start a private testnet

  ```
  sudo geth --dev --mine --etherbase 513e7364b492a71f6f6f277ea9ef008ca0b74bfd  --rpc --rpcaddr "0.0.0.0" --datadir /Users/ppoliani/Library/Ethereum
  ```

  With the command above we simply started a new testnet by setting the etherbase account to be the one we created earlier. Also we have to set the data directory to the one that is by default used by the Ethereum wallet. Unfortunately, we can not modify that directory through the Ethereum wallet app so we have to point geth to that location.

  4) Open the ethereum wallet

  ```
  open -a /Applications/Ethereum\ Wallet.app --args --rpc http://localhost:8545
  ```

  Ideally we wouldn't need to follow the above steps. We could simply be able to use the `ethereum-testrpc`. As of now, though, it doesn't work well with the Ethereum wallet (Mist). However, it works fine with the Metamask extensions. So if you're gonna be using that then ignore the above stepes.
