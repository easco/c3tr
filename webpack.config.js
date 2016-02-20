module.exports = {
  entry: './app/index',

  module: {
    loaders: [
      {
        include: /app/,
        loader: 'babel',
        test: /\.js$/
      }
    ]
  },

  output: {
    filename: 'application.js',
    path: './public'
  },

  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['app', 'node_modules'],
    root: __dirname
  }
};
