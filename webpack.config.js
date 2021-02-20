// 3rd Party Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/index.tsx",
	devtool: "eval-source-map", // source map
	resolve: {
		extensions: [".js", ".ts", ".tsx"], // for multiple .tsx files
	},
	module: {
		rules: [
			// This is the babel-loader, you need this
			{
				test: /\.tsx?$/,
				loader: "babel-loader",
				exclude: /node_modules/,
			},
			// you need this so that Webpack can handle CSS files
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: "css-loader", options: { modules: true } },
				],
			},
		],
	},
	// HtmlWebpackPlugin === for html bundling | MiniCssExtractPlugin === CSS to be added in /dist folder
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
		}),
		new MiniCssExtractPlugin(),
	],
};
