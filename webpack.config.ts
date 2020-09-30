import autoprefixer from 'autoprefixer';
import dotenv from 'dotenv';
import ForkTSCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import HTMLPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import RemoveFilesPlugin from 'remove-files-webpack-plugin';
import ScriptExtHTMLPlugin from 'script-ext-html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import {
  Configuration,
  EnvironmentPlugin,
  NormalModuleReplacementPlugin,
  WebpackPluginInstance,
} from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { Configuration as WDSConfiguration } from 'webpack-dev-server';
import { FilterWarningsPlugin } from 'webpack-filter-warnings-plugin';

dotenv.config();

const devMode = process.env.NODE_ENV !== 'production';

export default <Configuration>{
  mode: devMode ? 'development' : 'production',
  entry: './src/main.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: devMode ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: devMode ? '[name].js' : '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
  },
  devtool: devMode ? 'eval-cheap-module-source-map' : 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    host: '0.0.0.0',
    port: 8080,
    stats: module.exports.stats,
  } as WDSConfiguration,
  stats: devMode
    ? {
        all: false,
        assets: true,
        colors: true,
        hash: false,
        builtAt: true,
        timings: true,
        errors: true,
        errorDetails: true,
        logging: 'info',
        warnings: true,
        version: false,
        context: path.resolve(__dirname, 'src'),
      }
    : {
        cached: true,
        cachedAssets: true,
        cachedModules: true,
        colors: true,
        hash: true,
        timings: true,
        version: true,
      },
  optimization: {
    emitOnErrors: false,
    minimize: !devMode,
    minimizer: devMode ? [] : <WebpackPluginInstance[]>[new TerserPlugin()],
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new RemoveFilesPlugin({
      before: {
        exclude: ['./dist/tsconfig.tsbuildinfo'],
        test: [
          {
            folder: './dist',
            method: () => true,
          },
        ],
        log: false,
        logDebug: false,
      },
      watch: { beforeForFirstBuild: true },
    }),
    new ForkTSCheckerPlugin({
      async: true,
      eslint: { enabled: true, files: './src/**/*.{ts,tsx,js,jsx}' },
      logger: { devServer: true, infrastructure: 'silent', issues: 'webpack-infrastructure' },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: devMode ? 'server' : 'static',
      openAnalyzer: false,
    }),
    new NormalModuleReplacementPlugin(
      /.*\/generated\/iconSvgPaths.*/,
      path.resolve(__dirname, 'src/iconSvgPaths.js')
    ),
    new EnvironmentPlugin({ BLUEPRINT_NAMESPACE: 'bp3' }),
    new ScriptExtHTMLPlugin({ defaultAttribute: 'defer' }),
    new FilterWarningsPlugin({
      exclude: [
        /export 'unstable_renderSubtreeIntoContainer' \(imported as 'ReactDOM'\) was not found in 'react-dom'/,
        // blueprint css is chonky
        /entrypoint size limit:/,
        /webpack performance recommendations:/,
        /asset size limit:/,
      ],
    }),
    new HTMLPlugin({ template: path.resolve(__dirname, 'src/template.ejs'), chunks: ['main'] }),
    ...(devMode
      ? []
      : [
          new MiniCSSExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: devMode ? '[name].css' : '[name].[contenthash].css',
          }),
        ]),
  ],
  module: {
    rules: [
      { test: /\.(jpe?g|png|gif|mp3|ttf|eot|woff)$/i, loader: 'file-loader' },
      { test: /\.jsx?$/, enforce: 'pre', loader: 'source-map-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader', options: { transpileOnly: true } },
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, postcssOptions: { plugins: [autoprefixer()] } },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
};
