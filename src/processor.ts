import { SiteObject } from './types';
import { makeTemplate } from './util';

const process = ({ findTestCases, addCopyButton, isIncreaseStack }: SiteObject) => {
  const setTemplateToClipboard = () => {
    const testCases = findTestCases(document);
    const header = isIncreaseStack ? GM_getResourceText('increaseStack') : '';
    GM_setClipboard(makeTemplate(testCases, header));
    console.log('copied');
  };
  addCopyButton(document, setTemplateToClipboard);
  GM_registerMenuCommand('Copy template to clipboard', setTemplateToClipboard, 'c');
};

export const setUpSite = (site: SiteObject) => {
  const { invokeTypes, isReady } = site;
  if (invokeTypes.includes('normal')) {
    if (isReady === undefined) {
      process(site);
    } else {
      const interval = setInterval(() => {
        if (isReady(document)) {
          process(site);
          clearInterval(interval);
        }
      }, 500);
    }
  }
  if (invokeTypes.includes('load')) {
    window.addEventListener('load', () => process(site));
  }
  if (invokeTypes.includes('keydown')) {
    window.addEventListener('keydown', () => process(site));
  }
};
