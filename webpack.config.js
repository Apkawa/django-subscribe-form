const webpack = require('webpack')
const env = process.env.NODE_ENV

module.exports = {
  mode: env || 'development',
  context: __dirname + '/frontend',
  entry: './subscribe.js',
  devtool: env === 'production'? false:'inline-source-map',
  output: {
    path: __dirname + '/subscribe_form/static/subscribe_form/js/',
    filename: 'subscribe.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {"targets": "> 0.25%, not dead"}]
            ]
          }
        }
      }
    ]

  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}