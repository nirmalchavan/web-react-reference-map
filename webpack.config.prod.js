'strict';

const webpack = require('webpack');
const WebpackConfig = require('webpack-config');

module.exports = new WebpackConfig().extend('./webpack.config.base.js').merge({
    devtool: '#source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
});
