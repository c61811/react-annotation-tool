const path = require('path');

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
      },
      {
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'],
						 alias: {
								components: path.resolve(__dirname, "src/components"),
								models: path.resolve(__dirname, "src/models")
						 },
 	},
	plugins: []
}
