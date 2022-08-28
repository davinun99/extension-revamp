
const  { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: "development",
	devtool: 'cheap-module-source-map',
	entry: {
		popup: './src/popup/popup.tsx',
		content: './src/content/content.tsx',
		background: './src/background/background.ts',
	},
	output: {
		filename: '[name].js',
		path: resolve(__dirname, 'build'),
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: 'ts-loader',
			},
			{
				test: /\.s?css$/,
				use: ['style-loader','css-loader','sass-loader']
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({ template: 'src/popup/popup.html', filename: 'popup.html', chunks: ['popup'] }),
		new CopyWebpackPlugin({ patterns: [
			{ from: 'public', to: '.'},
		]}),
		new CleanWebpackPlugin(),
	],
};
