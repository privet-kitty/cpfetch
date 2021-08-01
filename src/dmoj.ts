import { SiteObject } from './types';
import { createCopyButton, deleteDuplicateTestCases, prettify, zip } from './util';

const findTestCases = (document: Document) => {
  console.log('find');
  const doc = document.cloneNode(true) as Document;
  doc.querySelectorAll('.copy-clipboard').forEach((node) => node.parentNode?.removeChild(node));
  const inputs: string[] = [];
  const outputs: string[] = [];
  doc.querySelectorAll('h4').forEach((node) => {
    const textContent = node.textContent?.normalize('NFKC');
    if (textContent === undefined) return;
    const inputRegExp = /^Sample Input\s*[0-9]*\s*$/;
    const outputRegExp = /^Sample Output\s*[0-9]*\s*$/;
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
    return deleteDuplicateTestCases(zip(inputs, outputs));
  } else {
    console.log('Failed to parse test cases.');
    return [];
  }
};

const addCopyButton = (document: Document, handler: () => void) => {
  const info_float = document.querySelector('div.info-float');
  if (info_float === null) return;
  const copyButton = createCopyButton(handler);
  copyButton.classList.add('button');
  info_float.appendChild(copyButton);
};

export const siteDmoj: SiteObject = {
  domain: 'dmoj.ca',
  findTestCases,
  addCopyButton,
};
