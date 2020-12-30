import { setUpSite } from './processor';
import { siteAtCoder } from './atcoder';

const hostname = new URL(document.URL).hostname;

[siteAtCoder].forEach((site) => {
  if (new RegExp(site.domain).test(hostname)) setUpSite(site);
});
