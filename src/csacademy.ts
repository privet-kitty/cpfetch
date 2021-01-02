import { COPY_BUTTON_ID, COPY_BUTTON_LABEL } from './constants';
import { SiteObject } from './types';
import { createCopyButton, prettify, zip } from './util';

const findTestCases = (document: Document) => {
  const inputs: string[] = [];
  const outputs: string[] = [];
  const headNodes = document.querySelectorAll<HTMLElement>('thead tr th');
  if (headNodes[0].innerText === 'Input' && headNodes[1].innerText === 'Output') {
    const grandparentNode = headNodes[0]?.parentNode?.parentNode;
    if (grandparentNode instanceof Element) {
      grandparentNode.nextElementSibling?.childNodes?.forEach((node) => {
        const [inputNode, outputNode] = node.childNodes;
        if (inputNode instanceof HTMLElement && outputNode instanceof HTMLElement) {
          inputs.push(prettify(inputNode.innerText));
          outputs.push(prettify(outputNode.innerText));
        }
      });
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
  const copyButton = createCopyButton(handler);
  h1.parentNode.insertBefore(copyButton, h1.nextSibling);
  return true;
};

const isReady = (document: Document) => {
  const headNodes = document.querySelectorAll('thead tr th');
  return (
    headNodes !== undefined &&
    headNodes.length >= 2 &&
    headNodes[0] instanceof HTMLElement &&
    headNodes[0].innerText === 'Input' &&
    headNodes[1] instanceof HTMLElement &&
    headNodes[1].innerText === 'Output'
  );
};

export const siteCsAcademy: SiteObject = {
  domain: 'csacademy.com',
  findTestCases,
  addCopyButton: (document: Document, handler: () => void) => {
    document.querySelectorAll('h1').forEach((node) => appendCopyButton(node, handler));
  },
  isReady,
};
