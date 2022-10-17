/* eslint-disable @typescript-eslint/no-unused-vars */

import { GetDerivedStateFromProps } from 'react'
const path = require('path')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const ESLintPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = (ext: string | string[]) =>
  isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  }

  if (isProd) {
    const prodConf = {
      ...config,
      minimize: true,
      minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
    }

    return prodConf
  }

  return config
}

const plugins = () => {
  const config = [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isDev,
      },
      favicon: `favicon.ico`,
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/favicon.ico'),
    //       to: path.resolve(__dirname, 'build'),
    //     },
    //   ],
    // }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    // new ESLintPlugin({
    //   extensions: ['tsx', 'jsx', 'ts'],
    //   exclude: 'node_modules',
    // }),
  ]
  if (isDev) {
    config.push(new ReactRefreshWebpackPlugin())
  }

  return config
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: path.resolve(__dirname, './src/index'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: filename('js'),
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
  },

  optimization: optimization(),
  devServer: {
    // static: {
    //   directory: path.resolve(__dirname, '..', ''),
    // },
    // compress: true,
    port: 3000,
    hot: isDev,
  },
  devtool: isDev ? 'eval' : 'source-map',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'assets/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
}
