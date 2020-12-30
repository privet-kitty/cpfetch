export type TestCases = [string, string][];

export type SiteObject = {
  domain: string;
  findTestCases: (document: Document) => TestCases;
  addCopyButton: (document: Document, handler: () => void) => void;
  isReady?: (document: Document, changes: MutationRecord[], observer: MutationObserver) => boolean;
  isIncreaseStack?: boolean;
};
