'strict';

const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');

/* POSTCSS Optimizations of CSS files */
const clean = require('postcss-clean');
const colorMin = require('postcss-colormin');
const discardDuplicates = require('postcss-discard-duplicates');
const discardEmpty = require('postcss-discard-empty');
const mergeRules = require('postcss-merge-rules');
const mergeLonghand = require('postcss-merge-longhand');
const minifyFonts = require('postcss-minify-font-values');
const orderedValues = require('postcss-ordered-values');
const uniqueSelectors = require('postcss-unique-selectors');

/* EXTRACT CSS for optimization and parallel loading */
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/index',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[id].bundle.js',
        publicPath: '/dist/',
        soureMapFilename: '[file].map'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new StatsPlugin('stats.json'),
        new ExtractTextPlugin('assets/css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]', {
            disable: false,
            allChunks: true
        })
    ],
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            exclude: /node_modules/,
            include: __dirname
        },
        {
            test: /\.scss$/i,
            loader: ExtractTextPlugin.extract(['css!postcss-loader', 'sass'])
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', ['css!postcss-loader'])
        },
        {
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
            loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
        }]
    },
    postcss() {
        return [mergeRules, mergeLonghand, uniqueSelectors, discardDuplicates,
                colorMin, clean, discardEmpty, orderedValues, minifyFonts];
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, './node_modules')]
    }
};
