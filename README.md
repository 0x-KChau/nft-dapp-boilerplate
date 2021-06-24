# Introduction
This project is a ready-to-go NFT DApp boilerplate. It is designed to deploy on top of Ethereum Blockchain. Nevertheless, it is compatiable to all EVM. Feel free to modify in order to publish to other EVM Networks. 

It already consists both Contract and Client sides for production usage. It makes use of couple popular packages to kick start. For example, `@truffle/hdwallet-provider`, `@metamask/detect-provider`, `@walletconnect/web3-provider`, `web3`, `react`, `next`, etc.

# Get Started
## Pre-requisites
1. [Nodejs installed]('https://nodejs.org/en/download/)
2. [Truffle installed](https://www.trufflesuite.com/docs/truffle/quickstart)
3. Cryto Wallet - browser extension installed, [Metamask is recommended](https://metamask.io/)


## DEV
```
// Create .env file in root directory and add the following variables
MNEMONIC=
MAINNET=

//Optional
ROPSTEN=
RINKEBY=
GOERLI=
KOVAN=
ETHERSCAN=
```
```
// Compile the smart contracts
truffle compile
```
```
// Run truffle develop & migrate
truffle develop
migrate
```
```
// client side development
cd ./client 
yarn dev
```

## Prod
```
// deploy the contract to chain
// see ./truffle-config.js file for configuration options
truffle migrate --network [networkName]
```
```
cd /client 
yarn build
```

# Reference

## Next.js client

This is the frontend client for our dapp. It is built with Next.js and uses a render-prop pattern (via `lib/Web3Container.js`) so we can easily inject blockchain functionality (i.e. web3, accounts, and the contract instance) into each page.

### Pages

- `index.js` — This is a barebones Next.js page. It links to other pages which are web3-enabled. In your dapp, this can be a landing page.

## The `lib` folder

### `contracts`

A symlink to the `build/contracts` located in the Truffle project is placed here so that the Next.js app can refer to the build artifacts from the parent Truffle project.

### `Web3Container.js`

This is a component that utilizes the render-prop pattern to inject `web3`, `accounts`, and `contract` instance objects into a given function. When these objects are loading, it will render a loading function that is expected to return a React component.

For an example of how to use it, please see the `accounts` and `dapp` pages.

You may want to modify this for your own purposes. For example, you can require multiple contracts if your dapp requires it.

### `getWeb3.js`

This is a function for actually getting the Web3 object. Unfortunately, this file is not as straight-forward as I would have liked it. Your best bet at understanding this is to read the comments I have written in the file. You probably don't need to change anything in this file.

### `getContract.js`

This function requires `web3` to be passed in. It uses `truffle-contract` to initialize and return a contract instance. This function is used by `Web3Container.js`. You probably don't need to change anything in this file.

### `walletConnector.js`

This makes use of `@walletconnect/web3-provider` and `@metamask/detect-provider` packages to fetch the wallet provider. It almost covers all existing popular cryptowallets in the market.
