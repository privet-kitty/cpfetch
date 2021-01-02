import { COPY_BUTTON_ID, COPY_BUTTON_LABEL } from './constants';
import { SiteObject } from './types';
import { createCopyButton, prettify, zip } from './util';

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

const addCopyButton = (document: Document, handler: () => void) => {
  const sidebar = document.querySelector('aside.sidebar');
  if (sidebar === null) return;
  const copyButton = createCopyButton(handler);
  copyButton.classList.add('button', 'grey');
  sidebar.appendChild(copyButton);
};

const isReady = (document: Document) => {
  return document.querySelector('aside.sidebar') !== null;
};

export const siteCodeChef: SiteObject = {
  domain: 'codechef.com',
  findTestCases,
  addCopyButton,
  isReady,
  isIncreaseStack: true,
};
