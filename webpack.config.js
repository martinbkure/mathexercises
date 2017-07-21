var webpack = require("webpack");

module.exports = {
    context: __dirname + '/app',
    entry: './index',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    devServer: {
      hot: true,
      contentBase: './dist',
      publicPath: '/dist/'
    },
    module: {
      loaders: 
      [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
}