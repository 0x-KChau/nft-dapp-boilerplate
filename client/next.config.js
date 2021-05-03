module.exports = {
  webpack: (config, { buildId, dev }) => {
    // This allows the app to refer to files through our symlink
    config.resolve.symlinks = false
    return config
  },
  env: {
    INFURA_ID: 'a3e7d4465ee2429794fefdd5d720b59e',
    MAINNET_ID: 'U1Wk6HNC96CHxCbmuYH7o4yaAjIWt3tg',
    RINKEBY_ID: 'EGxIq3TxG5zKjwHAFOascqM4LexQb8Aj',
    ROPSTEN_ID: 'gV4L3BXaFGfqIuXw07y2ONERPVt60Hpe'
  },
}
