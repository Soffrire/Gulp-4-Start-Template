module.exports = {
  output: {
    filename: 'app.min.js'
  },
  optimization: {
    minimize: false
  },
  mode: 'production',
  devtool: 'hidden-source-map'
};
