import { SiteObject } from './processor';
import { deleteDuplicateTestCases, prettify, zip } from './util';

const findTestCases = () => {
  const doc = document.cloneNode(true) as HTMLElement;
  doc.querySelectorAll('.div-btn-copy').forEach((node) => {
    node.parentNode?.removeChild(node);
  });
  doc.querySelectorAll('.btn-copy').forEach((node) => {
    node.parentNode?.removeChild(node);
  });
  const inputs: string[] = [];
  const outputs: string[] = [];
  doc.querySelectorAll('h3').forEach((node) => {
    const textContent = node.textContent?.normalize('NFKC');
    if (textContent === undefined) return;
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
  copyButton.id = 'copyButton';
  copyButton.classList.add('btn', 'btn-default', 'btn-sm');
  copyButton.innerHTML = 'Copy template to clipboard';
  copyButton.addEventListener('click', handler);
  h2.appendChild(copyButton);
  return true;
};

export const siteAtCoder: SiteObject = {
  domain: 'atcoder.jp',
  findTestCases,

  addCopyButton: (handler: () => void) => {
    appendCopyButton(document.querySelector('.h2'), handler) ||
      appendCopyButton(document.querySelector('h2'), handler); // for ancient atcoder
  },
  isIncreaseStack: false,
};
