import path from 'path';
import { UserscriptPlugin } from 'webpack-userscript';
import { userScriptConfig } from './userscript.config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
module.exports = (_: any, argv: any) => {
  const isDev = argv.mode === 'development';
  console.log(`environment: ${argv.mode}`);
  const {
    devURL,
    downloadBaseURL,
    updateBaseURL,
    devPort,
    scriptName,
    scriptHeaders,
  } = userScriptConfig;
  const outputPath = path.resolve(__dirname, 'dist');
  return {
    entry: path.join(__dirname, 'src/index.ts'),
    output: {
      path: outputPath,
      filename: `${scriptName}.js`,
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
      new UserscriptPlugin({
        headers: isDev
          ? {
              ...scriptHeaders,
              version: scriptHeaders.version && scriptHeaders.version + '-build.[buildNo]',
            }
          : scriptHeaders,
        downloadBaseURL,
        updateBaseURL,
        proxyScript: isDev
          ? {
              baseURL: devURL,
            }
          : undefined,
      }),
    ],
  };
};
