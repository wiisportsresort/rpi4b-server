const path = require('path');
const { config: dotenvConfig } = require('dotenv');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const TerserPlugin = require('terser-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

dotenvConfig({ path: './.env' });
// SSL_PATH, HTTPS_PORT, HTTP_PORT, WDS_PORT, BSP_PROXY_PORT


module.exports = [
  /* ------------------------------------------------------------------------------------------
  

  Backend
  

  ------------------------------------------------------------------------------------------ */
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
  /* ------------------------------------------------------------------------------------------
  

  Frontend
  

  ------------------------------------------------------------------------------------------ */
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
    devServer: {
      contentBase: [
        path.join(__dirname, 'dist/frontend'),
        path.join(__dirname, 'views'),
        path.join(__dirname, 'public')
      ],
      overlay: true,
      compress: true,
      port: process.env.WDS_PORT
    },
    // optimization: {
    //   minimizer: [
    //     new TerserPlugin({
    //       /* additional options here */
    //     })
    //   ]
    // },
    plugins: [
      // new BrowserSyncPlugin(
      //   {
      //     // browse to http://localhost:3000/ during development
      //     host: 'localhost',
      //     port: process.env.BSP_PROXY_PORT,
      //     // proxy the Webpack Dev Server endpoint
      //     proxy: 'http://localhost:' + process.env.WDS_PORT + '/'
      //   },
      //   {
      //     // prevent BrowserSync from reloading the page
      //     // and let Webpack Dev Server take care of this
      //     reload: false
      //   }
      // ),
      // new webpack.IgnorePlugin(/react|react-dom/),
      new BundleAnalyzerPlugin(),
      new MiniCSSExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ],
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
    stats: {
      children: false
    },
    watchOptions: {
      ignored: ['public/**', 'node_modules/**'],
      aggregateTimeout: 200
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
          test: /\.ts(x?)$/,
          loader: 'ts-loader'
        }
      ]
    }
  }
];
