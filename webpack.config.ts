import path from 'path';
import WebpackUserscript from 'webpack-userscript';
import { getUserScriptConfig } from './userscript.config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
module.exports = (_: any, option: any) => {
  const isDev = option.environment === 'development';
  const { devPath, devPort, scriptFileName, scriptHeaders } = getUserScriptConfig(isDev);
  const outputPath = path.resolve(__dirname, 'dist');
  return {
    entry: path.join(__dirname, 'src/index.ts'),
    output: {
      path: outputPath,
      filename: `${scriptFileName}.js`,
    },
    target: 'web',
    module: {
      rules: [
        {
          test: /\.(ts|js)$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    optimization: {
      minimize: !isDev,
    },
    devServer: {
      https: true,
      port: devPort,
      writeToDisk: true,
      contentBase: outputPath,
      hot: false,
      inline: false,
      liveReload: false,
    },
    plugins: [
      new WebpackUserscript({
        headers: scriptHeaders,
        proxyScript: {
          baseUrl: devPath,
          enable: isDev,
        },
      }),
    ],
  };
};
