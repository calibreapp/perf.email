'use strict'

let webpack = require('webpack')
let autoprefixer = require('autoprefixer')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: __dirname + '/src',
  entry: {
    javascript: './index.js'
  },
  output: {
    filename: 'index.js',
    path: __dirname + '/public',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader'],
      },
      {
        test: /\.svg$/,
        loaders: [
          'svg-sprite'
        ]
      }
    ]
  },
  postcss: function () {
    return [autoprefixer]
  }
}
