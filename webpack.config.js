const path = require('path');
const { merge } = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const mode = argv.mode || 'development';
const modeFlag = (mode === 'production');
const mergeWebpackConfig = require(`./config/webpack.${mode}.js`);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

webpackBaseConfig = {
  entry: path.join(__dirname, 'src/web/index.tsx'),
  output: {
    path: path.join(__dirname, 'dist/assets'),
  },
  mode: 'development',
  resolve: {
    alias: {
      '@components': path.resolve('src/web/components'),
      '@pages': path.resolve('src/web/pages'),
      '@routes': path.resolve('src/web/routes'),
      '@models': path.resolve('src/web/models'),
      '@utils': path.resolve('src/web/utils'),
      '@assets': path.resolve('src/web/assets')
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx'] // 配置扩展后缀，导入文件的时候才可以不加后缀
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/i,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|woff|woff2|ttf|svg|otf)$/,
        type: 'asset',
      }
      // {
      //   test: /\.(png|jpg|gif|jpeg)$/,
      //   use: [
      //     {
      //       loader: 'url-loader',
      //       options: {
      //         limit: 10240
      //       }
      //     }
      //   ]
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../views/index.html',
      template: `src/web/index-${mode}.html`
    }),
    new MiniCssExtractPlugin({
      filename: modeFlag ? 'styles/[name].[contenthash:5].css': 'styles/[name].css',
      chunkFilename: modeFlag ? 'styles/[name].[contenthash:5].css': 'styles/[name].css', 
      ignoreOrder: true
    }),
    new WebpackBuildNotifierPlugin(),
    new ProgressBarPlugin(),
    new CleanWebpackPlugin()
    // new BundleAnalyzerPlugin()
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM'
  },
  experiments: { // 开启实验选项
    asset: true
  }
};

module.exports = merge(mergeWebpackConfig, webpackBaseConfig);