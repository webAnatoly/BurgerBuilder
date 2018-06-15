const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'browser-bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // добавил, что-бы избежать ошибки при перезагрузке страницы при работе с реакт-роутером по адресу http://localhost:8080/checkout/contact-data
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64:5]',
              sourceMap: false,
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/',
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true, // Чтобы работал react-router
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
};
