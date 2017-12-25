const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'app'),
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  entry: path.resolve(__dirname, './app/client.jsx'),
  output: {
    path: __dirname + './public',
    filename: 'bundle.js',
  },

  plugins: [
    new CleanWebpackPlugin(['public']),
    new HtmlWebpackPlugin({
      template: '../view/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),

  ],

  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src'],
          },
        },
      },
      {
        test: /(\.css|\.scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env'],
            plugins: ['transform-runtime'],
          },
        },
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /public/],
        use: 'babel-loader',
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.(woff|woff2|ttf|eot)/,
        loader: 'url-loader?limit=1',
      },
      // { test: /\.gif$/, use: 'url-loader?limit=10000&mimetype=image/gif' },
      // { test: /\.jpg$/, use: 'url-loader?limit=10000&mimetype=image/jpg' },
      // { test: /\.png$/, use: 'url-loader?limit=10000&mimetype=image/png' },
      // { test: /\.svg/, use: 'url-loader?limit=26000&mimetype=image/svg+xml' },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },

  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'app'),
  },

  devtool: 'inline-source-map',
}