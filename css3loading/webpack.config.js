/**
 * Created by Administrator on 2017/5/15 0015.
 */
let path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin'); //分离css文件
let HtmlWebpackPlugin = require('html-webpack-plugin');         //生成html文件
let autoprefixer = require('autoprefixer');
let webpack = require('webpack');

module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use:"css-loader!postcss-loader"
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),    //分离css文件
        new HtmlWebpackPlugin({
            filename: 'test.html',              //模板
            template: 'index.html',             //文件名
            minify: {
                removeComments: true,           //去除注释
                collapseWhitespace: true,       //去除空格
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options:{
                postcss:function(){
                    return[autoprefixer({ browsers: ['not ie <= 8'] })]
                }
            }
        })
    ],

};