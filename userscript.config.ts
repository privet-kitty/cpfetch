import WebpackUserscript from 'webpack-userscript';
import pkg from './package.json';

const DEV_PORT = 8080;

interface IWebpackUserScript {
  /* development mode */
  isDev: boolean;

  /* development homepage path */
  devPath: string;

  /* http port */
  devPort: number;

  /* script file name, without file extension */
  scriptFileName: string;

  /**
   * userscript headers
   * including script name, description, match url, grants and so on
   * see https://www.tampermonkey.net/documentation.php for details
   **/
  scriptHeaders: WebpackUserscript.WPUSOptions['headers'];
}

export const getUserScriptConfig = (isDev: boolean): IWebpackUserScript => {
  return {
    isDev,
    devPath: isDev ? `https://localhost:${DEV_PORT}` : pkg.homepage,
    devPort: DEV_PORT,
    scriptFileName: pkg.name,
    scriptHeaders: {
      name: pkg.name,
      description: pkg.description,
      version: pkg.version,
      author: pkg.author.name,
      match: '*://(example.com|github.com)/*',
    },
  };
};
