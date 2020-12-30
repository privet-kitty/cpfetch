import { COPY_BUTTON_ID, COPY_BUTTON_LABEL } from './constants';
import { SiteObject } from './types';
import { prettify, zip } from './util';

const findTestCases = (document: Document) => {
  const inputs: string[] = [];
  const outputs: string[] = [];
  document.querySelectorAll('h3#exampleinput, h3#sampleinput').forEach((node) => {
    const text = node.nextElementSibling?.textContent;
    if (text !== undefined && text !== null) inputs.push(prettify(text));
  });
  document.querySelectorAll('h3#exampleoutput, h3#sampleoutput').forEach((node) => {
    const text = node.nextElementSibling?.textContent;
    if (text !== undefined && text !== null) outputs.push(prettify(text));
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
  if (h1.parentNode === undefined || h1.parentNode === null) return false;
  const copyButton = document.createElement('button');
  copyButton.id = COPY_BUTTON_ID;
  copyButton.innerHTML = COPY_BUTTON_LABEL;
  copyButton.addEventListener('click', handler);
  h1.parentNode.insertBefore(copyButton, h1.nextSibling);
  return true;
};

export const siteCodeChef: SiteObject = {
  invokeTypes: ['load', 'keydown'],
  domain: 'codechef.com',
  findTestCases,
  addCopyButton: (document: Document, handler: () => void) => {
    document.querySelectorAll('h1:not(.left)').forEach((h1) => appendCopyButton(h1, handler));
  },
};
