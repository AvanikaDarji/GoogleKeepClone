const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            minify: false,
            template: path.resolve(__dirname, 'src', 'index.html')
        })
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
                    // [style-loader](/loaders/style-loader)
                    /* { loader: 'style-loader' },
                     // [css-loader](/loaders/css-loader)
                     {
                         loader: 'css-loader',
                         options: {
                             modules: true
                         }
                     },
                     // [sass-loader](/loaders/sass-loader)
                     { loader: 'sass-loader' }*/

            }
            /*  {

                  test: /\.scss$/i,
                  use: ["style-loader", "css-loader", "sass-loader"],
              }*/

        ]
    }
});