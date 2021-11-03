import path from 'path'
import TypescriptDeclarationPlugin from 'typescript-declaration-webpack-plugin'

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
    libraryTarget: 'umd',
    library: 'mpilot',
    umdNamedDefine: true,
  },
  plugins: [new TypescriptDeclarationPlugin({ out: 'mpilot.d.ts' })],
  node: {
    fs: 'empty',
  },
}
