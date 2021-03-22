import { SiteObject } from './types';
import { createCopyButton, prettify, zip } from './util';

const findTestCases = (document: Document) => {
  const inputs: string[] = [];
  const outputs: string[] = [];
  document.querySelectorAll('pre.form-control').forEach((node) => {
    const textContent = node.textContent?.normalize('NFKC');
    if (textContent === undefined) return;
    const inputRegExp = /入力/;
    const outputRegExp = /出力/;
    const header = node.parentElement?.previousElementSibling?.textContent;
    if (header === undefined || header === null) return;
    if (inputRegExp.test(header)) {
      inputs.push(prettify(textContent));
    }
    if (outputRegExp.test(header)) {
      outputs.push(prettify(textContent));
    }
  });

  if (inputs.length === outputs.length) {
    return zip(inputs, outputs);
  } else {
    console.log('Failed to parse test cases.');
    return [];
  }
};

const appendCopyButton = (h1: Node | null, handler: () => void) => {
  if (h1 === null) return false;
  const copyButton = createCopyButton(handler);
  h1.parentNode?.insertBefore(copyButton, h1.nextSibling);
  return true;
};

export const siteMojacoder: SiteObject = {
  domain: 'mojacoder.app',
  findTestCases,
  addCopyButton: (document: Document, handler: () => void) => {
    document.querySelectorAll('h1').forEach((node) => {
      appendCopyButton(node, handler);
    });
  },
};
