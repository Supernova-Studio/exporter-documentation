const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntries = require("webpack-fix-style-only-entries");

module.exports = (env, argv) => ({
  plugins: [
    new FixStyleOnlyEntries(),
    new MiniCssExtractPlugin({
      filename: './assets/css/[name].min.css'
    })
  ],
  mode: argv.mode === 'production' ? 'production' : 'development',
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  // entry: ['./typescript/src/index.ts', './scss/main.scss'],
  entry: {
    'assets/js/uig': './src/_playstation/js/uig',
    'src/js_helpers': './typescript/src/index.ts',
    'main': './scss/main.scss'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

  output: {
    publicPath: '',
    filename: '[name].js',
    // path: path.resolve(__dirname, './')
    path: argv.mode === 'production' ? path.resolve(__dirname, './') : path.join(__dirname, '/.build')
  }
});
