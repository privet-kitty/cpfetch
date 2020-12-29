import path from 'path';
import WebpackUserscript from 'webpack-userscript';
import { UserScriptConfig } from './userscript.config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
module.exports = (_: any, options: any) => {
  const isDev = options.mode === 'development';
  console.log(`environment: ${options.mode}`);
  const { devUrl, devPort, scriptFileName, scriptHeaders } = UserScriptConfig;
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
        headers: isDev
          ? {
              ...scriptHeaders,
              versions: '[version]-build.[buildNo]',
            }
          : scriptHeaders,
        proxyScript: {
          baseUrl: devUrl,
          filename: '[basename].proxy.user.js',
          enable: isDev,
        },
      }),
    ],
  };
};
