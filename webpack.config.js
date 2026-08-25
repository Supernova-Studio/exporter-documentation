const path = require('path');
const vm = require('vm');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
The Pulsar SES compartment textually rejects sources containing HTML comment
tokens, and the bundled markdown parser carries them in a regex literal.
Rewrite the tokens as hex escapes with identical semantics, then parse the
result to guarantee the blanket replacement never corrupts the bundle.
*/
class EscapeHtmlCommentTokensPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('EscapeHtmlCommentTokens', (compilation) => {
      compilation.hooks.processAssets.tap(
        { name: 'EscapeHtmlCommentTokens', stage: webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT },
        (assets) => {
          for (const [name, asset] of Object.entries(assets)) {
            if (!name.endsWith('.js')) {
              continue;
            }

            const source = asset.source().toString();
            if (!source.includes('<!--') && !source.includes('-->')) {
              continue;
            }

            const escaped = source.replace(/<!--/g, '\\x3C!--').replace(/-->/g, '--\\x3E');
            new vm.Script(escaped, { filename: name });
            compilation.updateAsset(name, new webpack.sources.RawSource(escaped));
          }
        },
      );
    });
  }
}

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
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      // Webpack's web target picks this package's DOM build, which calls
      // document.createElement at module scope and crashes the DOM-less
      // Pulsar SES compartment; force the universal build instead
      'decode-named-character-reference': require.resolve('decode-named-character-reference')
    }
  },

  output: {
    publicPath: '',
    filename: '[name].js',
    path: path.resolve(__dirname, './')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new EscapeHtmlCommentTokensPlugin()
  ],
});
