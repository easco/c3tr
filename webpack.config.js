const path = require('path');

module.exports = {
  entry: './app/index.js',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
      }
    ]
  },

  output: {
    filename: 'application.js',
    path: path.resolve(__dirname, './public')
  },

  resolve: {
    extensions: ['.js'],
    modules: ['app', 'node_modules'],
  }
};
