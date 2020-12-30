import { COPY_BUTTON_ID, COPY_BUTTON_LABEL } from './constants';
import { SiteObject } from './types';
import { createTemplate } from './util';

const process = ({ findTestCases, addCopyButton, isIncreaseStack }: SiteObject) => {
  if (document.querySelector('#' + COPY_BUTTON_ID) !== null) {
    console.log('Copy button already exist.');
    return;
  }
  const setTemplateToClipboard = () => {
    const testCases = findTestCases(document);
    const header = isIncreaseStack ? GM_getResourceText('increaseStack') : '';
    GM_setClipboard(createTemplate(testCases, header));
    console.log('copied');
  };
  addCopyButton(document, setTemplateToClipboard);
  GM_registerMenuCommand(COPY_BUTTON_LABEL, setTemplateToClipboard, 'c');
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
    window.addEventListener('keydown', (e) => {
      if (e.key === 't') process(site);
    });
  }
};
