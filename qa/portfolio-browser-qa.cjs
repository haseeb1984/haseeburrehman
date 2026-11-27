const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = process.cwd();
const base = 'http://127.0.0.1:4173';
const htmlFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'qa-output') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(path.relative(root, full).split(path.sep).join('/'));
  }
}
function urlFor(file) { return file === 'index.html' ? base + '/' : base + '/' + file; }

(async () => {
  fs.mkdirSync('qa-output', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const failures = [];
  const pageErrors = [];
  try {
    const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
    desktop.on('pageerror', error => pageErrors.push('desktop: ' + error.message));
    const badResponses = [];
    desktop.on('response', response => {
      if (response.url().startsWith(base) && response.status() >= 400) badResponses.push(response.status() + ' ' + response.url());
    });

    walk(root);
    for (const file of htmlFiles) {
      const response = await desktop.goto(urlFor(file), { waitUntil: 'networkidle' });
      if (!response || !response.ok()) failures.push('Page failed: ' + file + ' (' + (response?.status() ?? 'no response') + ')');
      const title = await desktop.title();
      if (!title.trim()) failures.push('Missing document title: ' + file);
      await desktop.screenshot({ path: 'qa-output/' + file.replaceAll('/', '_').replace('.html', '') + '-desktop.png', fullPage: true }).catch(() => {});
    }
    if (badResponses.length) failures.push(...badResponses);

    await desktop.goto(base + '/', { waitUntil: 'networkidle' });
    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    mobile.on('pageerror', error => pageErrors.push('mobile: ' + error.message));
    await mobile.goto(base + '/', { waitUntil: 'networkidle' });
    const toggle = mobile.locator('.menu-toggle');
    if (await toggle.count() !== 1) failures.push('Mobile navigation toggle not found exactly once');
    else {
      await toggle.click();
      if (await toggle.getAttribute('aria-expanded') !== 'true') failures.push('Mobile menu did not set aria-expanded=true');
      if (!(await mobile.locator('#primary-navigation').evaluate(el => el.classList.contains('nav-open')))) failures.push('Mobile menu did not open');
      await mobile.keyboard.press('Escape');
      if (await toggle.getAttribute('aria-expanded') !== 'false') failures.push('Escape did not close mobile menu');
      if (!(await toggle.evaluate(el => el === document.activeElement))) failures.push('Escape did not restore focus to menu toggle');
      await toggle.click();
      await mobile.locator('#primary-navigation a').first().click();
      if (await toggle.getAttribute('aria-expanded') !== 'false') failures.push('Selecting a nav link did not close mobile menu');
    }
    await mobile.goto(base + '/', { waitUntil: 'networkidle' });
    await mobile.screenshot({ path: 'qa-output/home-mobile.png', fullPage: true });

    const resume = await browser.newPage({ viewport: { width: 1200, height: 900 } });
    await resume.goto(base + '/resume/', { waitUntil: 'networkidle' });
    const pdf = await resume.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true, path: 'qa-output/resume-a4.pdf' });
    if (pdf.length < 1000 || pdf.subarray(0, 4).toString() !== '%PDF') failures.push('Resume PDF output is invalid or unexpectedly small');
    const info = require('node:child_process').execFileSync('pdfinfo', ['qa-output/resume-a4.pdf'], { encoding: 'utf8' });
    const pageCount = Number((info.match(/^Pages:\s+(\d+)/m) || [])[1] || 0);
    if (!pageCount) failures.push('Could not determine resume PDF page count');
    if (pageCount > 12) failures.push('Resume PDF is unexpectedly long: ' + pageCount + ' pages');
    fs.writeFileSync('qa-output/summary.txt', [
      'HTML pages checked: ' + htmlFiles.length,
      'Resume PDF pages: ' + pageCount,
      'Desktop/mobile browser checks: completed',
      'Console page errors: ' + pageErrors.length,
      ...pageErrors.map(x => 'PAGE ERROR: ' + x),
      ...failures.map(x => 'FAIL: ' + x)
    ].join('\n') + '\n');

    if (pageErrors.length) failures.push(...pageErrors);
    console.log(fs.readFileSync('qa-output/summary.txt', 'utf8'));
    if (failures.length) process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
