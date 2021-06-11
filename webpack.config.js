const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const WebpackBarPlugin = require('webpackbar')

module.exports = {
  mode: 'production',
  entry: {
    serverless: path.resolve(__dirname, './server/serverless.ts'),
  },
  output: {
    path: path.resolve(__dirname, './server'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // TypeScript をコンパイルする
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), './node_modules'],
    plugins: [
      new TsconfigPathsPlugin({
        // tsconfig.json はデフォルト
        configFile: 'tsconfig.json',
      }),
    ],
  },
  target: 'node',
  externals: ['nuxt'],
  stats: 'errors-only',
  plugins: [
    new WebpackBarPlugin({
      name: 'Serverless',
      color: '#228be6',
    }),
  ],
}
