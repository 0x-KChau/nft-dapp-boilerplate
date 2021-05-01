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
    goerli_infura: {
      provider: function() {
        return new HDWalletProvider({
          ...options,
          providerOrUrl: `wss://goerli.infura.io/ws/v3/${process.env.PROJECTID}`,
        })
      },
      network_id: 5,
      gas: 7500000,
      gasPrice: 100000000, // 0.1 GWEI
      websockets: true,
      timeoutBlocks: 50000,
      networkCheckTimeout: 1000000
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          {
            ...options,
            providerOrUrl: `wss://eth-ropsten.ws.alchemyapi.io/v2/${process.env.ROPSTENID}`,//`wss://ropsten.infura.io/ws/v3/${process.env.PROJECTID}`,
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
            providerOrUrl: `wss://eth-rinkeby.ws.alchemyapi.io/v2/${process.env.RINKEBY}`,
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
