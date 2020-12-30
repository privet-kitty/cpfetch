import { COPY_BUTTON_ID, COPY_BUTTON_LABEL } from './constants';
import { SiteObject } from './types';
import { prettify, zip } from './util';

const findTestCases = (document: Document) => {
  const inputs: string[] = [];
  const outputs: string[] = [];
  const headNodes = document.querySelectorAll<HTMLElement>('thead tr th');
  if (headNodes[0].innerText === 'Input' && headNodes[1].innerText === 'Output') {
    const grandparentNode = headNodes[0]?.parentNode?.parentNode;
    if (grandparentNode) {
      const ios = (grandparentNode as Element).nextElementSibling?.childNodes;
      if (ios !== undefined) {
        ios.forEach((node) => {
          const inputNode = node.childNodes[0] as HTMLElement;
          const outputNode = node.childNodes[1] as HTMLElement;
          inputs.push(prettify(inputNode.innerText));
          outputs.push(prettify(outputNode.innerText));
        });
      }
    }
  }
  console.log(inputs, outputs);
  if (inputs.length > 0 && inputs.length === outputs.length) {
    return zip(inputs, outputs);
  } else {
    console.log('Failed to parse test cases.');
    return [];
  }
};

const appendCopyButton = (h1: Node | null, handler: () => void) => {
  if (h1 === null) return false;
  if (h1.parentNode === null) return false;
  const copyButton = document.createElement('button');
  copyButton.id = COPY_BUTTON_ID;
  copyButton.innerHTML = COPY_BUTTON_LABEL;
  copyButton.addEventListener('click', handler);
  h1.parentNode.insertBefore(copyButton, h1.nextSibling);
  return true;
};

export const siteCsAcademy: SiteObject = {
  invokeTypes: ['keydown'],
  domain: 'csacademy.com',
  findTestCases,
  addCopyButton: (document: Document, handler: () => void) => {
    document.querySelectorAll('h1').forEach((node) => appendCopyButton(node, handler));
  },
};
