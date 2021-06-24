const dotenv = require("dotenv")
dotenv.config();

module.exports = {
  webpack: (config, { buildId, dev }) => {
    // This allows the app to refer to files through our symlink
    config.resolve.symlinks = false
    return config
  },
  env: {
    INFURA_ID: process.env.INFURA_ID,
    MAINNET_ID: process.env.MAINNET_ID,
    RINKEBY_ID: process.env.RINKEBY_ID,//optional
    ROPSTEN_ID: process.env.ROPSTEN_ID//optional
  }
}
