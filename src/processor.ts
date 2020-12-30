import { COPY_BUTTON_ID, COPY_BUTTON_LABEL } from './constants';
import { SiteObject } from './types';
import { createTemplate } from './util';

const process = ({ findTestCases, addCopyButton, isIncreaseStack }: SiteObject) => {
  if (document.getElementById(COPY_BUTTON_ID) !== null) {
    console.log('Copy button already exists.');
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
  const { isReady } = site;
  if (isReady === undefined) {
    process(site);
  } else {
    const check = (changes: MutationRecord[], observer: MutationObserver) => {
      if (isReady(document, changes, observer)) {
        console.log('isReady() succeeded');
        observer.disconnect();
        process(site);
      }
    };
    new MutationObserver(check).observe(document, { childList: true, subtree: true });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 't') process(site);
  });
};
