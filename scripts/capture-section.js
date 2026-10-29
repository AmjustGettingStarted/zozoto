import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sectionId = process.argv[2] || 'hero';
const outputDir = path.join(__dirname, '..', 'screenshots', 'current');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 }
];

async function run() {
  const browser = await chromium.launch();
  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2
    });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);

    const selector = `#${sectionId}`;
    const el = await page.$(selector);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      const outPath = path.join(outputDir, `${sectionId}_${vp.name}.png`);
      await el.screenshot({ path: outPath });
      console.log(`Saved: ${outPath}`);
    } else {
      console.warn(`Selector ${selector} not found`);
    }
    await page.close();
  }
  await browser.close();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
