import { COPY_BUTTON_ID, COPY_BUTTON_LABEL } from './constants';
import { SiteObject } from './types';
import { prettify, zip } from './util';

const findTestCases = (document: Document) => {
  const inputs: string[] = [];
  const outputs: string[] = [];
  document.querySelectorAll('h6').forEach((node) => {
    if (node.textContent === null) return;
    const textContent = node.textContent.normalize('NFKC');
    const inputRegExp = /入力/;
    const outputRegExp = /出力/;
    if (inputRegExp.test(textContent)) {
      const preNode = node.nextElementSibling;
      if (preNode !== null && preNode.textContent !== null) {
        inputs.push(prettify(preNode.textContent));
      }
    }
    if (outputRegExp.test(node.textContent)) {
      const preNode = node.nextElementSibling;
      if (preNode !== null && preNode.textContent !== null) {
        outputs.push(prettify(preNode.textContent));
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
  const copyButton = document.createElement('button');
  copyButton.id = COPY_BUTTON_ID;
  copyButton.innerHTML = COPY_BUTTON_LABEL;
  copyButton.addEventListener('click', handler);
  h3.parentNode?.insertBefore(copyButton, h3.nextSibling);
  return true;
};

export const siteYukicoder: SiteObject = {
  invokeTypes: ['normal'],
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
