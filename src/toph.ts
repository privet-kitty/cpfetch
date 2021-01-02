import { COPY_BUTTON_ID, COPY_BUTTON_LABEL } from './constants';
import { SiteObject } from './types';
import { createCopyButton, prettify, zip } from './util';

const findTestCases = (document: Document) => {
  const inputs: string[] = [];
  const outputs: string[] = [];
  for (let i = 0; i < 1000; i++) {
    const elm = document.getElementById(`preSample${i}Input`);
    if (elm === null) break;
    if (elm.textContent !== null) inputs.push(prettify(elm.textContent));
  }
  for (let i = 0; i < 1000; i++) {
    const elm = document.getElementById(`preSample${i}Output`);
    if (elm === null) break;
    if (elm.textContent !== null) outputs.push(prettify(elm.textContent));
  }

  console.log(inputs, outputs);

  if (inputs.length === outputs.length) {
    return zip(inputs, outputs);
  } else {
    console.log('Failed to parse test cases.');
    return [];
  }
};

const addCopyButton = (h1: Node | null, handler: () => void) => {
  if (h1 === null) return false;
  if (h1.parentNode === null) return false;
  const copyButton = createCopyButton(handler);
  copyButton.classList.add('btn', 'default');
  h1.parentNode.insertBefore(copyButton, h1.nextSibling);
  return true;
};

export const siteToph: SiteObject = {
  domain: 'toph.co',
  findTestCases,
  addCopyButton: (document: Document, handler: () => void) => {
    document.querySelectorAll('h1').forEach((node) => {
      console.log(node.textContent);
      addCopyButton(node, handler);
    });
  },
};
