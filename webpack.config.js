
module.exports = {
	entry: './src/assets/scripts/main.js',
	output: {
		filename: 'main.js'
	},
	devtool: 'sourcemap',
	module: {
		loaders: [{
			test: /\.html$/,
			exclude: /node_modules/,
			loader: "html-loader"
		}, {
			test: /\.css$/,
			exclude: /node_modules/,
			loader: "style-loader!css-loader"
		}, {
			test: /\.(woff|svg|ttf|eot)([\?]?.*)$/,
			exclude: /node_modules/,
			loader: "file-loader?name=./app/assets/fonts/[name].[ext]"
		}, {
			test: /\.(png|jpg|gif|jpeg|svg)([\?]?.*)$/,
			exclude: /node_modules/,
			loader: "file-loader?name=../assets/images/[name]-[hash:6].[ext]"
		}]
	},
	resolve: {
		extensions: ['', '.html', '.js', '.json', 'css', 'scss', 'png', 'svg']
	}
};
