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
    if (node.textContent === null) return;
    const textContent = node.textContent.normalize('NFKC');
    const inputRegExp = /^.*(入力例|Sample Input)\s*[0-9]*\s*$/;
    const outputRegExp = /^.*(出力例|Sample Output)\s*[0-9]*\s*$/;
    if (inputRegExp.test(textContent)) {
      const preNode = node.parentNode?.querySelector('pre');
      if (preNode !== null && preNode !== undefined && preNode.textContent !== null) {
        inputs.push(prettify(preNode.textContent));
      }
    }
    if (outputRegExp.test(textContent)) {
      const preNode = node.parentNode?.querySelector('pre');
      if (preNode !== null && preNode !== undefined && preNode.textContent !== null) {
        outputs.push(prettify(preNode.textContent));
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

const appendCopyButton = (h2: Node | null, handler: () => void) => {
  if (h2 === null) return false;
  const copyButton = document.createElement('button');
  copyButton.id = COPY_BUTTON_ID;
  copyButton.classList.add('btn', 'btn-default', 'btn-sm');
  copyButton.innerHTML = COPY_BUTTON_LABEL;
  copyButton.addEventListener('click', handler);
  h2.appendChild(copyButton);
  return true;
};

export const siteAtCoder: SiteObject = {
  domain: 'atcoder.jp',
  findTestCases,
  addCopyButton: (document: Document, handler: () => void) => {
    appendCopyButton(document.querySelector('.h2'), handler) ||
      appendCopyButton(document.querySelector('h2'), handler); // for ancient atcoder
  },
};
