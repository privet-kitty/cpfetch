import { COPY_BUTTON_ID, COPY_BUTTON_LABEL } from './constants';
import { SiteObject } from './types';
import { prettify, zip } from './util';

const findTestCases = (document: Document) => {
  const inputs: string[] = [];
  const outputs: string[] = [];
  document.querySelectorAll('h3#exampleinput, h3#sampleinput').forEach((node) => {
    const itext = node.nextElementSibling?.textContent;
    if (itext !== undefined && itext !== null) inputs.push(prettify(itext));
  });
  document.querySelectorAll('h3#exampleoutput, h3#sampleoutput').forEach((node) => {
    const otext = node.nextElementSibling?.textContent;
    if (otext !== undefined && otext !== null) outputs.push(prettify(otext));
  });
  for (let id = 1; id < 1000; id++) {
    const itext = document.getElementById(`exampleinput${id}`)?.nextElementSibling?.textContent;
    const otext = document.getElementById(`exampleoutput${id}`)?.nextElementSibling?.textContent;
    if (!(itext && otext)) break;
    inputs.push(prettify(itext));
    outputs.push(prettify(otext));
  }

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
  copyButton.classList.add('button', 'grey');
  copyButton.addEventListener('click', handler);
  h1.parentNode.insertBefore(copyButton, h1.nextSibling);
  return true;
};

const isReady = (document: Document) => {
  return document.querySelectorAll('h1:not(.left)').length > 0;
};

export const siteCodeChef: SiteObject = {
  domain: 'codechef.com',
  findTestCases,
  addCopyButton: (document: Document, handler: () => void) => {
    document.querySelectorAll('h1:not(.left)').forEach((h1) => appendCopyButton(h1, handler));
  },
  isReady,
  isIncreaseStack: true,
};
