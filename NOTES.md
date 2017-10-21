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
