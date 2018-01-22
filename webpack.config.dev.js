require('dotenv').config();
var path = require('path');
var webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './webapp/approot'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './webapp/index.html', to: "index.html" }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        SERVER_HOST: JSON.stringify(process.env.SERVER_HOST)
      }
    })
  ],
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, 'webapp/assets'),
      Styles: path.resolve(__dirname, 'webapp/assets/css'),
      Images: path.resolve(__dirname, 'webapp/assets/images')
    }
  },
  node: {
    net: 'empty'
  },
  module: {
    rules: [
      // js
      {
        test: /\.js/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'webapp')
      },
      // CSS
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        include: [path.join(__dirname, 'webapp'), /node_modules/]
      },
      // statics
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: '[hash].[ext]'
        }
      }
    ]
  }
};
