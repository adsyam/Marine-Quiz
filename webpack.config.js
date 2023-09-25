const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { default: test } = require('node:test');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		bundle: path.resolve(__dirname, 'src/js/index.js'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		clean: true,
		assetModuleFilename: '[name][ext]',
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		port: 5500,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
		// host: "192.168.100.80",
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
						],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Quiz App',
			filename: 'index.html',
			template: path.resolve(__dirname, 'src/template.html'),
			watch: true,
		}),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: '5500',
			proxy: 'http://localhost:5500',
		}),
	],
};
