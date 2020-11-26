const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  output: {
    publicPath: '/',
    filename: 'scripts/[name].bundle.js',
    assetModuleFilename: 'images/[name][ext]'
  },
  devServer: {
    quiet: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, '../dist'),
    proxy: {
      '/api': 'http://localhost:3000',
    }
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['构建成功！'],
        notes: ['项目已启动成功，请在浏览器中访问...']
      },
      onErrors: function (severity, errors) {}
    })
  ]
}