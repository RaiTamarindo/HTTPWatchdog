const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =
{
    entry:
    {
        app: './webapp/src/app/app.js'
    },
    output:
    {
        path: path.join(__dirname, '../..', 'public'),
        filename: '[name].js'
    },
    module:
    {
        rules:
        [
            {test: /\.html$/, use: 'raw-loader'},
            {test: /\.(png|jpg)$/, use: 'url-loader?limit=8192'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&minetype=application/font-woff'},
            {test: /\.woff2$/, use: 'url-loader?limit=10000&minetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&minetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&minetype=image/svg+xml'}
        ]
    },
    plugins:
    [
        new HtmlWebpackPlugin(
        {
            template: 'webapp/src/index.html',
            inject: 'body'
        })
    ],
    devtool: 'source-map',
};
