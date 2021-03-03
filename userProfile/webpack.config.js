const path = require('path');

const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');


module.exports = {
  entry: path.resolve('src','index'),
  output: {
    path: path.resolve('build'),
    publicPath: 'build',
    filename: 'index.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
          test: /\.(png|woff|woff2|eot)$/,
          use: ['file-loader']
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      process: "process/browser"
    }
  },
  devServer: {
    writeToDisk: true,
    port: 1337,
    open: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new ESLintPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ]
};
