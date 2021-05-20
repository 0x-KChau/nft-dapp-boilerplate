const path = require("path");
const dotenv = require("dotenv")
const HDWalletProvider = require("@truffle/hdwallet-provider");

dotenv.config();

const options = {
  mnemonic: {
    phrase: process.env.MNEMONIC
  },
  numberOfAddresses: 4,
  shareNonce: true,
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/lib/contracts"),
  networks: {
    development: {
      port: 9545,
      host: "127.0.0.1",
      network_id: 5777,
      gas: 4248490,
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(
          {
            ...options,
            providerOrUrl: `wss://eth-mainnet.ws.alchemyapi.io/v2/${process.env.MAINNET_ID}`,
            chainId: 1
          }
        )
      },
      from: '0x6295c31c892B0723c6cd27fD7B3c7E51F4Dd4fEc',
      network_id: 1,
      websockets: true,
      gas: 4248490,
      gasPrice: 100000000000,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          {
            ...options,
            providerOrUrl: `wss://eth-ropsten.ws.alchemyapi.io/v2/${process.env.ROPSTEN_ID}`,
            chainId: 3
          }
        )
      },
      network_id: 3,
      websockets: true,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          {
            ...options,
            providerOrUrl: `wss://eth-rinkeby.ws.alchemyapi.io/v2/${process.env.RINKEBY_ID}`,
            chainId: 4
          }
        )
      },
      from: '0xa085C984D0d8B1a4CD8032b60C1FfBBCD1a30d11',
      network_id: 4,
      websockets: true,
      gas: 4248490,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000
    },
    goerli: {
      provider: function() {
        return new HDWalletProvider(
          {
            ...options,
            providerOrUrl: `wss://eth-goerli.ws.alchemyapi.io/v2/${process.env.GOERLI_ID}`,
            chainId: 5
          }
        )
      },
      network_id: 5,
      websockets: true,
      gas: 4248490,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          {
            ...options,
            providerOrUrl: `wss://eth-kovan.ws.alchemyapi.io/v2/${process.env.KOVAN_ID}`,
            chainId: 42
          }
        )
      },
      from: '0xa085C984D0d8B1a4CD8032b60C1FfBBCD1a30d11',
      network_id: 42,
      websockets: true,
      gas: 4248490,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000
    },
  },
  compilers: {
    solc: {
      version: "0.8.3"
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN
  }
};
