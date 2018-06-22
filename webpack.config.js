const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
     hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
 },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new EncodingPlugin({
      encoding: 'unicode'
    }),
    new HtmlWebpackPlugin({
      title: '番茄日历',
      template: 'src/index.html'
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development'
};