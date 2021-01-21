const path = require('path');
const tasks = require('./tasks').tasks;

const ESLintPlugin = require('eslint-webpack-plugin');


const entries = {};
const rewrites = [];
for (var k in tasks) {
  addTask(tasks[k].order, tasks[k].id);
}

function addTask(order, id) {
  const orderAndId = order + '.' + id;
  entries[id] = ['./src/' + orderAndId + '/index.js'];
  rewrites.push({
    from: new RegExp('^\/(' + orderAndId.replace(/\./, '\\.') + ')|(' + order + ')$', 'i'),
    to: '/src/' + orderAndId + '/index.html'
  });
}

module.exports = {
  entry: entries,
  output: {
    path: path.resolve('build'),
    publicPath: 'build',
    filename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: {
      rewrites: rewrites,
    },
  },
  plugins: [new ESLintPlugin()]
};
