// ==UserScript==
// @name        cpfetch
// @version     0.3.2
// @author      Hugo Sansaqua
// @description Userscript for competitive programming: parse test cases and copy template to clipboard on various online judges
// @homepage    https://github.com/privet-kitty/cpfetch
// @match       https://atcoder.jp/*/tasks/*
// @match       https://*.codechef.com/*/problems/*
// @match       https://*.codechef.com/problems/*
// @match       https://yukicoder.me/problems/*
// @match       https://toph.co/p/*
// @match       https://toph.co/arena*
// @match       https://csacademy.com/contest/*/task/*
// @namespace   https://privet-kitty.github.io/
// @grant       GM_setClipboard
// @grant       GM_registerMenuCommand
// @grant       GM_getResourceText
// @resource    template https://raw.githubusercontent.com/privet-kitty/cl-competitive/master/non-module/template.lisp
// @resource    modOperations https://raw.githubusercontent.com/privet-kitty/cl-competitive/master/module/mod-operations.lisp
// @resource    increaseStack https://raw.githubusercontent.com/privet-kitty/cl-competitive/master/non-module/increase-space.lisp
// @downloadURL https://privet-kitty.github.io/cpfetch/cpfetch.user.js
// @updateURL   https://privet-kitty.github.io/cpfetch/cpfetch.meta.js
// ==/UserScript==
