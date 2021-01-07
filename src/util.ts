/** TODO: clean up many hard-coded strings */
import { TestCases } from './types';

// FIXME: more sane formatting of S-expression
export const formatTestForm = (testCases: TestCases) => {
  const escapeQuote = (s: string) => s.replace('"', '\\"');
  const prefix = `;; To run: (5am:run! :sample)
#+swank
(5am:test :sample
`;
  const suffix = `)
`;
  // make each test form
  const enclose = (input: string, output: string) => `  (5am:is
   (equal "${output}"
          (run "${input}" nil)))
`;

  let result = prefix;
  testCases.forEach(([input, output]) => {
    result += enclose(escapeQuote(input), escapeQuote(output));
  });
  if (result[result.length - 1] === '\n') {
    result = result.slice(0, -1);
  }
  result += suffix;
  return result;
};

export const findMod = (problemText: string) => {
  const result = [];
  const contains = (list: RegExp[]) => {
    return list.some((s) => problemText.search(s) >= 0);
  };
  // prevent a number containing default mod (e.g. '110007') from being incorrectly detected
  const frob = (s: RegExp) => new RegExp('(^|[^\\d])' + s.source + '($|[^\\d])');
  if (contains([frob(/998,?244,?353/)])) result.push(998244353);
  else if (contains([frob(/163,?577,?857/)])) result.push(163577857);
  else if (contains([frob(/1,?000,?000,?007/), /10\^[\s{]*9[\s}]*\+[\s]*7/]))
    result.push(1000000007);
  else if (contains([frob(/1,?000,?000,?009/), /10\^[\s{]*9[\s}]*\+[\s]*9/]))
    result.push(1000000009);
  else if (contains([frob(/10,?007/)])) result.push(10007);
  return result.length === 1 ? result[0] : null;
};

const insert = (dest: string, src: string, idx: number) => {
  return dest.slice(0, idx) + src + dest.slice(idx);
};

const insertMod = (template: string) => {
  const mod = findMod(document.body.textContent ?? '');
  if (mod === null) {
    return template;
  } else {
    console.log(`Use ${mod} as modulus`);
    let result = template.replace('1000000007', String(mod));
    const header1 = 'BEGIN_INSERTED_CONTENTS';
    const modOperations =
      GM_getResourceText('modOperations') + '\n(define-mod-operations cl-user::+mod+ :cl-user)\n\n';
    result = insert(result, modOperations, result.search(header1) + header1.length + 1);
    const header2 = 'BEGIN_USE_PACKAGE';
    const modUsePackage = `(eval-when (:compile-toplevel :load-toplevel :execute)
(use-package :cp/mod-operations :cl-user))
`;
    result = insert(result, modUsePackage, result.search(header2) + header2.length + 1);
    return result;
  }
};

const insertUrl = (template: string) => {
  return template.replace('PROBLEM_URL_TO_BE_REPLACED', document.URL);
};

export const createTemplate = (testCases: TestCases, header: string) => {
  const testForm = formatTestForm(testCases);
  const templateProto = GM_getResourceText('template');
  const template = insertUrl(insertMod(templateProto));
  return header + template + '\n' + testForm;
};

export const prettify = (s: string) => {
  const res = s.replace('/\r\n?/', '\n').replace(/^\s+/, '').replace(/\s+$/, '');
  if (res.length === 0 || res[res.length - 1] !== '\n') {
    return res + '\n';
  } else {
    return res;
  }
};

export const deleteDuplicateTestCases = (testCases: TestCases) => {
  const result: TestCases = [];
  const set = new Set<string>();
  testCases.forEach(([input, output]) => {
    if (!set.has(input)) {
      set.add(input);
      result.push([input, output]);
    }
  });
  return result;
};

export const zip = <T>(array1: T[], array2: T[]): [T, T][] => {
  return array1.map((_, i) => [array1[i], array2[i]]);
};

export const COPY_BUTTON_ID = 'cpfetchCopyButton';
export const COPY_BUTTON_LABEL = 'Copy template to clipboard';

export const createCopyButton = (handler: () => void) => {
  const copyButton = document.createElement('button');
  copyButton.id = COPY_BUTTON_ID;
  copyButton.innerHTML = COPY_BUTTON_LABEL;
  copyButton.addEventListener('click', handler);
  return copyButton;
};
