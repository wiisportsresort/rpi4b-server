const path = require('path');
const { config: dotenvConfig } = require('dotenv');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
dotenvConfig({ path: './.env' });

module.exports = {
  entry: {
    index: './src/backend/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist/backend'),
    filename: '[name].js'
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.js', '.json']
  },
  target: 'node',
  devtool: 'source-map',
  stats: {
    all: true,
    children: false,
    // children: false,
    // errors: true,
    // errorDetails: true,
    // colors: true,
    // builtAt: true
  },
  watchOptions: {
    ignored: ['public/**', 'node_modules/**'],
    aggregateTimeout: 300
  },
  plugins: [
    new webpack.EnvironmentPlugin(['PORT', 'NODE_PATH'])
  ],
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: 'source-map-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  }
};
