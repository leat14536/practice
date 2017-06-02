/**
 * Created by Administrator on 2017/5/15 0015.
 */
let path = require('path')
let ExtractTextPlugin = require('extract-text-webpack-plugin'); //分离css文件
let HtmlWebpackPlugin = require('html-webpack-plugin');         //生成html文件
<<<<<<< HEAD
let autoprefixer = require('autoprefixer');                     //css前缀
let webpack = require('webpack');
=======
>>>>>>> master

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
<<<<<<< HEAD
                use:"css-loader!postcss-loader"
=======
                use: 'css-loader'
>>>>>>> master
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
<<<<<<< HEAD
        }),
        new webpack.LoaderOptionsPlugin({
            options:{
                postcss:function(){
                    return[autoprefixer({ browsers: ['not ie <= 8'] })]
                }
            }
        })
    ],

=======
        })
    ]
>>>>>>> master
};