/**
 * @param {Object} config
 */
module.exports = function createConfig(config = {}) {
  const output = config.output instanceof Object ? config.output : {};

  return {
    entry: config.entry,
    output: {
      filename: '[name].js',
      ...output,
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      modules: ['node_modules', 'src'],
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react'],
          },
        },
      }, {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }],
    },
    mode: config.mode,
    devtool: config.devtool,
    target: config.target,
    externals: config.externals,
    stats: {
      warnings: false,
    },
  };
};
