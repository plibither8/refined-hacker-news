'use strict';
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SizePlugin = require('size-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = () => ({
	devtool: 'sourcemap',
	stats: 'errors-only',
	entry: {
		content: './src/content',
		background: './src/background',
		popup: './src/popup'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new SizePlugin(),
		new CopyWebpackPlugin([
			{
				from: '*',
				context: 'src',
				ignore: [
					'*.js'
				]
			},
			{
				from: 'node_modules/webextension-polyfill/dist/browser-polyfill.min.js'
			}
		])
	],
	resolve: {
		extensions: [
			'.js'
		]
	},
	optimization: {
		// Without this, function names will be garbled and enableFeature won't work
		concatenateModules: true,

		// Automatically enabled on production; keeps it somewhat readable for AMO reviewers
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					mangle: false,
					compress: false,
					output: {
						beautify: true,
						indent_level: 2 // eslint-disable-line camelcase
					}
				}
			})
		]
	}
});
