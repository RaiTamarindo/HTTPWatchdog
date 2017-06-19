var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig,
{
    module:
    {
        rules:
        [
            {
                test: /\.scss$/,
                use:
                [
                    'style-loader',
                    'css-loader?sourceMap',
                    'postcss-loader',
                    'sass-loader?config=sassLoader'
                ]
            },
        ]
    },
});