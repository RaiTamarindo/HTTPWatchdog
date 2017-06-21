const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

// webpack plugins
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = webpackMerge(commonConfig,
{
    debug: false,
    devtool: 'source-map',
    output:
    {
        path: path.join(__dirname, '../..', 'public'),
        filename: '[name].min.js',
        sourceMapFilename: '[name].min.map',
        chunkFilename: '[id].chunk.js'
    },
    module:
    {
        rules:
        [
            {
                test: /\.scss$/,
                use:
                [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins:
    [
        new UglifyJsPlugin(
        {
            sourceMap: true,
            beautify: false,
            mangle:
            {
                screw_ie8 : true
            },
            compress:
            {
                screw_ie8: true,
                warnings: true
            },
            comments: false
        }),
        //new ExtractTextPlugin("styles.min.css")
    ]
});
