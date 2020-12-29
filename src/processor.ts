import { TestCases } from './types';
import { deleteDuplicateTestCases, prettify, zip, makeTemplate } from './util';

export type SiteObject = {
  domain: string;
  /** Extract test cases from document  */
  findTestCases: () => TestCases;
  addCopyButton: (handler: () => void) => void;
  isReady?: () => boolean;
  isIncreaseStack: boolean;
};
