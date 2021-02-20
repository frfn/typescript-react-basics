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
			// this is the css-loader, you need this
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: "css-loader", options: { modules: true } },
				],
			},
			// this is the image | svg loaders, you need this
			{
				test: /.svg$/,
				exclude: /node_modules/,
				loader: "@svgr/webpack",
				options: {
					svgoConfig: {
						plugins: {
							removeViewBox: false,
						},
					},
				},
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
