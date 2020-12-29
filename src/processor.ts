import { TestCases } from './types';

type InvokeType = 'NORMAL' | 'KEYDOWN' | 'LOAD';

export type SiteObject = {
  invokeTypes: InvokeType[];
  domain: string;
  findTestCases: (document: Document) => TestCases;
  addCopyButton: (document: Document, handler: () => void) => void;
  isReady?: (document: Document) => boolean;
  isIncreaseStack?: boolean;
};
