export type TestCases = [string, string][];

type InvokeType = 'normal' | 'keydown' | 'load';

export type SiteObject = {
  invokeTypes: InvokeType[];
  domain: string;
  findTestCases: (document: Document) => TestCases;
  addCopyButton: (document: Document, handler: () => void) => void;
  isReady?: (document: Document) => boolean;
  isIncreaseStack?: boolean;
};
