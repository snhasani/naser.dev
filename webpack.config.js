
module.exports = {
	entry: './src/assets/scripts/main.js',
	output: {
		filename: 'main.js'
	},
	devtool: 'sourcemap',
	module: {},
	resolve: {
		extensions: ['', '.html', '.js', '.json', 'css', 'scss', 'png', 'svg']
	}
};
