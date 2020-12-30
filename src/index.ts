import { setUpSite } from './processor';
import { siteAtCoder } from './atcoder';
import { siteCodeChef } from './codechef';
import { siteYukicoder } from './yukicoder';
import { siteCsAcademy } from './csacademy';
import { siteToph } from './toph';

const hostname = new URL(document.URL).hostname;

[siteAtCoder, siteCodeChef, siteYukicoder, siteCsAcademy, siteToph].forEach((site) => {
  if (new RegExp(site.domain).test(hostname)) setUpSite(site);
});
