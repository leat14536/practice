/**
 * Created by Administrator on 2017/5/19 0019.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        filename: '[name].js',                           //出口文件名
        //publicPath: '/assets/',
        path: path.resolve(__dirname, './dist'),         //出口路径
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',             //使用babel-loader
                    options: {
                        presets: ['env'],
                        plugins: ['transform-object-assign',]
                    }
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractPlugin.extract({
                    //fallback: 'style-loader',
                    use: 'css-loader!postcss-loader!sass-loader'
                })
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 5000,
                    name: '/font/[name]-[hash:8].[ext]'
                }
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                loader: 'file-loader?name=assets/[hash:8].[name].[ext]'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',              //模板
            template: './src/index.html',             //文件名
            minify: {
                removeComments: true,           //去除注释
                collapseWhitespace: true,       //去除空格
            }
        }),
        new ExtractPlugin('style.css'),
        new webpack.LoaderOptionsPlugin({
            options:{
                postcss:function(){
                    return[autoprefixer({ browsers: ['not ie <= 8'] })]
                }
            }
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "./dist"),
        clientLogLevel: "none",//阻止消息
        compress: true,
        port: 9000
    }
}



















































