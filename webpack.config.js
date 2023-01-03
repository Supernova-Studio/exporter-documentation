const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* generate a webpack configuration that:
- converts all scss files into assets/css/main.min.css file and minifies it
- converts selected js files from assets/js/ into assets/js/dist/docs.min.js file and minifies it
- converts all ts files into a js_helpers.js file and minifies it
*/

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',
  devtool: argv.mode === 'production' ? false : 'inline-source-map',

  entry: {
    'src/js_helpers': './typescript/src/index.ts',
    'assets/dist/docs.min': [
      './assets/js/toast.js',
      './assets/js/syncscroll.js',
      './assets/js/search.js',
      './scss/main.scss'
    ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        
        extractComments: false,
      })
    ]
  },

  // Webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'] },

  output: {
    publicPath: '',
    filename: '[name].js',
    path: path.resolve(__dirname, './')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
});
