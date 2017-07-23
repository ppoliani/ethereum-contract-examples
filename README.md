# ownership-ethereum-contract
An example of a DApp that tracks ownership in the Ethereum blockchain


# Testing

1. Start a dev node

  ```
  geth --dev --mine --rpc --etherbase '3dde4414424e5e0f7b027cbad322a56c08ef2a06' --unlock=0  --ipcpath /Users/ppoliani/Library/Ethereum/geth.ipc --datadir /Users/ppoliani/Library/Ethereum/
  ```

2. Attach geth console
  `geth --datadir /Users/ppoliani/Library/Ethereum/ --dev attach`
