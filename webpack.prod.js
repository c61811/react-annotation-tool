const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  entry: "./src/Main.js",
  mode: "production",
	//devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: 'bundle.js',
		libraryTarget: "commonjs2"
  },
  plugins: [
		new CleanWebpackPlugin(['dist/*.*'])
	]
});


/*new UglifyJSPlugin({
	cache: true,
	sourceMap: true,
	parallel: true,
}),*/
