const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const htmlTerserPlugin = require('html-minifier-terser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    context: path.resolve(__dirname, 'src'),
    mode: "production",
    devtool: 'source-map',
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),


    ],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss|css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            /*  {
                  test: /\.scss|css$/,
                  include: /node_modules/,
                  use: [
                      // [style-loader](/loaders/style-loader)
                      { loader: 'style-loader' },
                      // [css-loader](/loaders/css-loader)
                      {
                          loader: 'css-loader'
                      },
                      // [sass-loader](/loaders/sass-loader)
                      {
                          loader: 'sass-loader',
                          options: {
                              indentedSyntax: true
                          }

                      },
                      {
                          loader: 'MiniCssExtractPlugin'
                      }
                  ]


              }*/




        ]
    }
});