import path from 'path'

export default {
  mode: 'production',
  devtool: 'source-map',
  entry: [path.resolve('./src/index')],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules\/.*\/dist\/.*/],
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'mpilot.js',
  },
  node: {
    fs: 'empty',
  },
}
