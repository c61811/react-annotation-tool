const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
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
	plugins: [
		new CleanWebpackPlugin(['dist'])
	]
}
