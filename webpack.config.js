var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {

  devtool: 'inline-source-map',
  entry: {
    polyfills: './app/polyfills.ts',
    vendor: './app/vendor.ts',
    app: './app/app.bootstrap.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'app'),
      path.resolve(__dirname, 'node_modules')
    ],
    extensions: ['.ts', '.js', '.html', '.css', '.json'],
    descriptionFiles: ['package.json']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        loader: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        // loaders: ['raw-loader', 'css?sourceMap', 'sass?sourceMap']
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]',
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.html'
    }),
    !isDevelopment ? new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false
      },
      minimize: true,
      mangle: false
    }) : null
  ],
  devServer: {
    historyApiFallback: true,
  }

};
