const path = require('path');
const { config: dotenvConfig } = require('dotenv');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
// const TerserPlugin = require('terser-webpack-plugin');

dotenvConfig({ path: './.env' });

module.exports = [
  /* ----------------------------------------------------------------------------------------------
  

  Backend
  

  ---------------------------------------------------------------------------------------------- */
  {
    name: 'backend',
    entry: {
      http: './src/backend/http.ts',
      https: './src/backend/https.ts'
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
    node: {
      __dirname: false,
      __filename: false
    },
    devtool: 'source-map',
    stats: {
      all: true,
      children: false
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
    plugins: [new webpack.EnvironmentPlugin(['SSL_PATH', 'HTTPS_PORT', 'HTTP_PORT'])],
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
  },
  /* ----------------------------------------------------------------------------------------------
  

  Frontend
  

  ---------------------------------------------------------------------------------------------- */
  {
    name: 'frontend',
    entry: { main: ['./src/frontend/main.tsx', './src/frontend/main.scss'] },
    output: {
      path: path.resolve(__dirname, 'dist/frontend'),
      filename: '[name].js'
    },
    resolve: {
      modules: ['src', 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    devtool: 'source-map',
    // optimization: {
    //   minimizer: [
    //     new TerserPlugin({
    //       /* additional options here */
    //     })
    //   ]
    // },
    plugins: [
      new MiniCSSExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ],
    // externals: {
    //   react: "React",
    //   "react-dom": "ReactDOM",
    //   jquery: "$"
    // },
    stats: { all: true },
    watchOptions: {
      ignored: ['public/**', 'node_modules/**'],
      aggregateTimeout: 300
    },
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|mp3|ttf|eot|woff)$/i,
          loader: 'file-loader'
        },
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
          test: /\.tsx?$/,
          loader: 'ts-loader'
        }
      ]
    }
  }
];
