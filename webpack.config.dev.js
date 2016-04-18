'strict';

const webpack = require('webpack');
const WebpackConfig = require('webpack-config');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const JasmineWebpackPlugin = require('jasmine-webpack-plugin');

module.exports = new WebpackConfig().extend('./webpack.config.base.js').merge({
    devtool: 'inline-source-map',
    entry: './client.js',
    output: {
        path: './node_modules/react/dist',
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    /* plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new JasmineWebpackPlugin(),
		new OpenBrowserPlugin({ url: 'http://localhost:3000', browser: 'chrome' }),
        //new OpenBrowserPlugin({ url: 'http://localhost:3000/dist/_specRunner.html' }),
        //new OpenBrowserPlugin(),
        //new OpenBrowserPlugin({ url: 'http://localhost:3000' })
    ], */
	module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/,
            //include: __dirname
			//query: {
			//	presets:['react','es2015']
			//}
        }
		]
	}
});
