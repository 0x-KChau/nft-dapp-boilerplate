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
            providerOrUrl: process.env.MAINNET,
            chainId: 1
          }
        )
      },
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
            providerOrUrl: process.env.ROPSTEN,
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
            providerOrUrl: process.env.RINKEBY,
            chainId: 4
          }
        )
      },
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
            providerOrUrl: process.env.GOERLI,
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
            providerOrUrl: process.env.KOVAN,
            chainId: 42
          }
        )
      },
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
