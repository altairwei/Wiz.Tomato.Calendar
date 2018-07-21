const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const EncodingPlugin = require('webpack-encoding-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
    TomatoCalendar_Global: './src/global.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },  
  devtool: 'eval',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader",
        query: {
          presets: ['es2015','react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  optimization: {
      splitChunks: {
          cacheGroups: {
              commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendor',
                  chunks: 'all'
              }
          }
      }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '番茄日历',
      template: './src/index.html',
      chunks: ['index', 'vendor']
    }),
    new EncodingPlugin({
      encoding: 'utf16le',
      include: [/global.js/]
    }),    
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  mode: 'development'
};