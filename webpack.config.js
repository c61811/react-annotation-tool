const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const demo = {
  entry: "./src/demo/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
				options: { presets: ['env', "react"],
									 plugins: ["transform-object-rest-spread", "transform-class-properties"] }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
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
		new CleanWebpackPlugin(['dist']),
		new webpack.HotModuleReplacementPlugin()
	]
};

const main = {
  entry: "./src/Main.js",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
				options: { presets: ['env', "react"],
									 plugins: ["transform-object-rest-spread", "transform-class-properties"] }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: 'bundle.js',
		libraryTarget: "commonjs2"
  },
  plugins: [
		new CleanWebpackPlugin(['dist']),
	]
};

module.exports = [demo, main]
