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
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777
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
      network_id: 1,
      websockets: true,
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
      network_id: 4,
      websockets: true,
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
