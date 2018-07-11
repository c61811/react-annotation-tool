const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require("webpack");


module.exports = merge(common, {
  entry: "./src/demo/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: 'demo.bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
		host: 'www.chi-lin.com',
    port: 3000,
    publicPath: "http://www.chi-lin.com:3000/dist/",
    hotOnly: true
  },
  plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
});
