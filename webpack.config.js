module.exports = {
  entry: `${__dirname}/web/index.js`,
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/dist',
    filename: 'build.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /(node_modules)/, use: 'babel-loader' }
    ]
  },
  devServer: {
    contentBase: './',
    port: 4000
  }
}
