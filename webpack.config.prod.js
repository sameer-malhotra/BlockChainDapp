require('dotenv').config();
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './webapp/approot'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'",
        SERVER_HOST: JSON.stringify(process.env.SERVER_HOST)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    })
  ],
  resolve: {
    alias: {
      Assets: path.resolve(__dirname, 'webapp/assets'),
      Styles: path.resolve(__dirname, 'webapp/assets/css'),
      Images: path.resolve(__dirname, 'webapp/assets/images')
    }
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
