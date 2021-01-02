import { COPY_BUTTON_ID, COPY_BUTTON_LABEL } from './constants';
import { SiteObject } from './types';
import { createCopyButton, prettify, zip } from './util';

const findTestCases = (document: Document) => {
  const inputs: string[] = [];
  const outputs: string[] = [];
  document.querySelectorAll('h6').forEach((node) => {
    const textContent = node.textContent?.normalize('NFKC');
    if (textContent === undefined) return;
    const inputRegExp = /入力/;
    const outputRegExp = /出力/;
    if (inputRegExp.test(textContent)) {
      const itext = node.nextElementSibling?.textContent;
      if (itext !== null && itext !== undefined) {
        inputs.push(prettify(itext));
      }
    }
    if (outputRegExp.test(textContent)) {
      const otext = node.nextElementSibling?.textContent;
      if (otext !== null && otext !== undefined) {
        outputs.push(prettify(otext));
      }
    }
  });

  if (inputs.length === outputs.length) {
    return zip(inputs, outputs);
  } else {
    console.log('Failed to parse test cases.');
    return [];
  }
};

const appendCopyButton = (h3: Node | null, handler: () => void) => {
  if (h3 === null) return false;
  const copyButton = createCopyButton(handler);
  h3.parentNode?.insertBefore(copyButton, h3.nextSibling);
  return true;
};

export const siteYukicoder: SiteObject = {
  domain: 'yukicoder.me',
  findTestCases,
  addCopyButton: (document: Document, handler: () => void) => {
    document.querySelectorAll('h3').forEach((node) => {
      if (node.textContent !== null && /No./.test(node.textContent)) {
        appendCopyButton(node, handler);
      }
    });
  },
};
