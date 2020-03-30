const autoprefixer = require('autoprefixer');
const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // optimization: {
  //   minimizer: [
  //     new TerserPlugin({
  //       /* additional options here */
  //     })
  //   ]
  // },
  entry: {
    main: ['./src/frontend/main.ts', './src/frontend/main.scss']
  },
  output: {
    path: path.resolve(__dirname, 'dist/frontend'),
    filename: '[name].js'
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.js', '.json']
  },
  devtool: 'source-map',
  plugins: [
    new MiniCSSExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    jquery: '$'
  },
  stats: {
    all: true
  },
  watchOptions: {
    ignored: ['public/**', 'node_modules/**'],
    aggregateTimeout: 300
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
};
