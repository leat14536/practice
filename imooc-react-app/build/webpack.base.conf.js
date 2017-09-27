/**
 * Created by Administrator on 2017/9/24 0024.
 */
/* eslint-disable */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    index:path.resolve(__dirname, '../src/index.jsx')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename:'[name].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: resolve('./src/components'),
      fetchDir: resolve('./src/fetch'),
      common: resolve('./src/common'),
      reduxDir: resolve('./src/redux'),
      containers: resolve('./src/containers')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$|.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /favicon.png$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }]
      },
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader','postcss-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader','postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  }
}
