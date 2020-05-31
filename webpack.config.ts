const path = require('path');

type Module = {
  context: string;
};

module.exports = () => ({
  devServer: {
    compress: true,
    contentBase: './bin',
    hot: true,
    open: true,
    port: 1235,
    writeToDisk: true,
  },
  devtool: 'inline-source-map',
  entry: './src/index.tsx',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        include: path.join(__dirname, 'src'),
        loader: 'ts-loader',
        test: /\.ts$|tsx/,
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module: Module) {
            const packageName: string = module.context?.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            ) as unknown as string;

            return packageName && `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
  output: {
    path: path.join(__dirname, 'bin'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  plugins: [],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [],
  },
});
