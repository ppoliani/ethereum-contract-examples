const webpack = require('webpack');
const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');

const sourcePath = path.join(__dirname, './');
const distPath = path.join(__dirname, './dist');

module.exports = () => {
  const isProd = process.env.NODE_ENV === 'production';

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.NamedModulesPlugin()
  ];

  return {
    devtool: isProd ? 'source-map' : 'source-map',
    context: sourcePath,

    entry: {
      app: [
        'babel-polyfill',
        'react-hot-loader/patch',
        './src/view/Index.jsx'
      ],
      vendor: [
        'react',
        'react-dom',
        'react-redux',
        'immutable',
        'whatwg-fetch',
        'core-decorators'
      ]
    },

    output: {
      path: distPath,
      publicPath: '/',
      filename: '[name].bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]'
            },
          },
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
          include: /flexboxgrid/
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ],
        },
      ]
    },

    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        sourcePath
      ]
    },

    plugins,

    performance: isProd && {
      maxAssetSize: 100,
      maxEntrypointSize: 300,
      hints: 'warning',
    },

    stats: {
      colors: {
        green: '\u001b[32m',
      },
      errorDetails: true,
    },

    devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      historyApiFallback: true,
      port: process.env.PORT,
      compress: isProd,
      inline: !isProd,
      hot: !isProd,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: true,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m',
        }
      }
    }
  };
};
