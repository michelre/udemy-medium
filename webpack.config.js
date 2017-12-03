module.exports = {
  entry: `${__dirname}/web/index.js`,
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/dist/',
    filename: 'build.js'
  },
  devtool: "source-map",
  module: {
    rules: [
      {test: /\.js$/, exclude: /(node_modules)/, use: 'babel-loader'},
      {test: /\.css$/, use: [{loader: "style-loader"}, {loader: "css-loader"}]},
      {test: /\.scss$/, use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]},
      {test: /\.(png|jpg|gif)$/, use: [{loader: 'file-loader', options: {}}]},
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',      // override the default path
          }
        }]
      },
      {
        test: require.resolve("blueimp-file-upload"),
        use: "imports-loader?define=>false"
      },
      {
        test: require.resolve("medium-editor-insert-plugin"),
        use: "imports-loader?define=>false"
      }
    ]
  },
  devServer: {
    contentBase: './',
    historyApiFallback: true,
    port: 4000,
    proxy: {
      '/api': 'http://127.0.0.1:3000'
    }
  }
}
