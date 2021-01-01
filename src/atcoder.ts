import { COPY_BUTTON_ID, COPY_BUTTON_LABEL } from './constants';
import { SiteObject } from './types';
import { deleteDuplicateTestCases, prettify, zip } from './util';

const findTestCases = (document: Document) => {
  const doc = document.cloneNode(true) as Document;
  doc.querySelectorAll('.div-btn-copy').forEach((node) => node.parentNode?.removeChild(node));
  doc.querySelectorAll('.btn-copy').forEach((node) => node.parentNode?.removeChild(node));
  const inputs: string[] = [];
  const outputs: string[] = [];
  doc.querySelectorAll('h3').forEach((node) => {
    const textContent = node.textContent?.normalize('NFKC');
    if (textContent === undefined) return;
    const inputRegExp = /^.*(入力例|Sample Input)\s*[0-9]*\s*$/;
    const outputRegExp = /^.*(出力例|Sample Output)\s*[0-9]*\s*$/;
    if (inputRegExp.test(textContent)) {
      const itext = node.parentNode?.querySelector('pre')?.textContent;
      if (itext !== null && itext !== undefined) {
        inputs.push(prettify(itext));
      }
    }
    if (outputRegExp.test(textContent)) {
      const otext = node.parentNode?.querySelector('pre')?.textContent;
      if (otext !== null && otext !== undefined) {
        outputs.push(prettify(otext));
      }
    }
  });

  if (inputs.length === outputs.length) {
    return deleteDuplicateTestCases(zip(inputs, outputs));
  } else {
    console.log('Failed to parse test cases.');
    return [];
  }
};

const addCopyButton = (document: Document, handler: () => void) => {
  const h2 = document.querySelector('span.h2');
  if (h2 === null) return;
  const copyButton = document.createElement('button');
  copyButton.id = COPY_BUTTON_ID;
  copyButton.classList.add('btn', 'btn-default', 'btn-sm');
  copyButton.innerHTML = COPY_BUTTON_LABEL;
  copyButton.addEventListener('click', handler);
  h2.appendChild(copyButton);
};

export const siteAtCoder: SiteObject = {
  domain: 'atcoder.jp',
  findTestCases,
  addCopyButton,
};
