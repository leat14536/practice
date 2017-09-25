/**
 * Created by Administrator on 2017/8/4 0004.
 */
/* eslint-disable */
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
  return {
    entry: {
      index: './src/index.jsx'
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename:'[name][hash].js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        components: resolve('./src/components'),
        fetch: resolve('./src/fetch')
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
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    devServer: {
      proxy:{
        '/api':{
          target: 'http://localhost:8080',
          secure: false
        }
      },
      port: 8100,
      historyApiFallback: true
    }
  }
}
