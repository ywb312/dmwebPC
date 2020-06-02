'use strict';

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    // 入口文件
    entry: './src/main.js',
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: './'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    // 这个loader取代style-loader。作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    // 将css文件整合到js文件中
                    'css-loader',
                ]
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/, // babel-loader不解析这些文件
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: {
                                    version: 3
                                },
                                targets: {
                                    chrome: '60',
                                    firefox: '50'
                                }
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.vue$/,
                loader: ['vue-loader'] // 解析.vue文件
            },
            { // 解析背景图片 --- 图片转为了 base64
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [ // 解析器的另一种写法
                    {
                        loader: 'url-loader', //解析背景图片
                        query: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            // 关闭es6模块化
                            esModule: false,
                            outputPath: 'imgs'
                        }
                    }
                ]
            },
            // 打包其他资源(除了html/js/css资源以外的资源)
            {
                // 排除css/js/html资源
                exclude: /\.(css|js|html|less)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.css', '.vue', 'scss'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devtool: 'source-map',
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            // 压缩html代码
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    // 热更新
    devServer: {
        publicPath: "/",
        // 项目构建后路径
        contentBase: path.resolve(__dirname, "dist"),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true,
        //热更新 性能优化
        hot: true,
        proxy: {
            '/dmweb': { //代理api
                target: "http://localhost:8080/dmweb", //服务器api地址
                changeOrigin: true, //是否跨域
                ws: true, // proxy websockets
                pathRewrite: { //重写路径
                    "^/dmweb": '/'
                }
            }
        },
    }
};