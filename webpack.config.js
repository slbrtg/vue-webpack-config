const webpack = require('webpack')
const path = require('path')

// Naming and path setup
let appName = "app"
const entryPoint = './src/main.js'
const exportPath = path.resolve(__dirname, './build')

// Environment flag
let plugins = [];
const env = process.env.WEBPACK_ENV

// Differ settings based on production flag
if (env == 'production') {
  const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

  plugins.push(new UglifyJsPlugin({ minimize: true }))
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }));

  appName = appName + '.min.js'
} else {
  appName = appName + '.js'
}

// Main Settings Config
module.exports = {
  entry: entryPoint,
  output: {
    path: exportPath,
    filename: appName
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins
}
