// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Change 'src/client' to 'dist'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src/client/'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // Serve from the 'dist' folder
    compress: true,
    port: 8080,
    open: true,
  },
};

