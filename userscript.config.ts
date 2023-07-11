import { HeadersProps } from 'webpack-userscript';
import pkg from './package.json';

const DEV_PORT = 8080;

type UserScriptConfig = {
  devURL: string;
  downloadBaseURL: string;
  updateBaseURL: string;
  devPort: number;
  scriptName: string;
  /** See https://www.tampermonkey.net/documentation.php for details */
  scriptHeaders: HeadersProps;
};

export const userScriptConfig: UserScriptConfig = {
  devURL: `https://localhost:${DEV_PORT}`,
  devPort: DEV_PORT,
  downloadBaseURL: `${pkg.baseUrl}${pkg.name}/`,
  updateBaseURL: `${pkg.baseUrl}${pkg.name}/`,
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
      'https://mojacoder.app/*/*/problems/*',
      'https://dmoj.ca/problem/*',
    ],
    grant: ['GM_setClipboard', 'GM_registerMenuCommand', 'GM_getResourceText'],
    resource: {
      template:
        'https://raw.githubusercontent.com/privet-kitty/cl-competitive/master/non-module/template.lisp',
      modOperation:
        'https://raw.githubusercontent.com/privet-kitty/cl-competitive/master/module/mod-operations.lisp',
      increaseStac:
        'https://raw.githubusercontent.com/privet-kitty/cl-competitive/master/non-module/increase-space.lisp',
    },
  },
};
