import WebpackUserscript from 'webpack-userscript';
import pkg from './package.json';

const DEV_PORT = 8080;

interface IWebpackUserScript {
  devUrl: string;
  /** base URL for distributing script */
  baseUrl: string;
  devPort: number;
  scriptName: string;
  /**
   * userscript headers
   * see https://www.tampermonkey.net/documentation.php for details
   **/
  scriptHeaders: WebpackUserscript.HeaderObject;
}

export const userScriptConfig: IWebpackUserScript = {
  devUrl: `https://localhost:${DEV_PORT}`,
  devPort: DEV_PORT,
  baseUrl: pkg.baseUrl,
  scriptName: pkg.name,
  scriptHeaders: {
    name: pkg.name,
    namespace: pkg.baseUrl,
    description: pkg.description,
    version: pkg.version,
    author: pkg.author.name,
    match: [
      'https://atcoder.jp/*/tasks/*',
      'https://*.codechef.com/*/problems/*',
      'https://*.codechef.com/problems/*',
      'https://yukicoder.me/problems/*',
      'https://toph.co/p/*',
      'https://toph.co/arena*',
      'https://csacademy.com/contest/*/task/*',
    ],
    grant: ['GM_setClipboard', 'GM_registerMenuCommand', 'GM_getResourceText'],
    resource: [
      'template https://raw.githubusercontent.com/privet-kitty/cl-competitive/master/non-module/template.lisp',
      'modOperations https://raw.githubusercontent.com/privet-kitty/cl-competitive/master/module/mod-operations.lisp',
      'increaseStack https://raw.githubusercontent.com/privet-kitty/cl-competitive/master/non-module/increase-space.lisp',
    ],
  },
};
