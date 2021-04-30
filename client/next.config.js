module.exports = {
  webpack: (config, { buildId, dev }) => {
    // This allows the app to refer to files through our symlink
    config.resolve.symlinks = false
    return config
  },
  env: {
    PROJECTID: 'a3e7d4465ee2429794fefdd5d720b59e',
  },
}
