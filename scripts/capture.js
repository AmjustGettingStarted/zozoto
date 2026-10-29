import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mode = process.argv[2] || 'before'; // 'before' | 'after' | specific name
const outputDir = path.join(__dirname, '..', 'screenshots', mode);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 }
];

const sections = [
  { id: 'hero', selector: '#hero' },
  { id: 'better-food', selector: '#better-food' },
  { id: 'features', selector: '#features' },
  { id: 'elite', selector: '#elite' },
  { id: 'ecosystem', selector: '#ecosystem' },
  { id: 'download', selector: '#download' },
  { id: 'footer', selector: '#footer' }
];

async function capture() {
  const browser = await chromium.launch();

  for (const vp of viewports) {
    console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2
    });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    // Wait an extra 1.5s for fonts & initial animations to settle
    await page.waitForTimeout(1500);

    // Full page screenshot
    const fullPath = path.join(outputDir, `full_${vp.name}.png`);
    await page.screenshot({ path: fullPath, fullPage: true });
    console.log(`Saved full page: ${fullPath}`);

    // Per-section screenshots
    for (const sec of sections) {
      try {
        const el = await page.$(sec.selector);
        if (el) {
          // Scroll element into view smoothly and let animations settle
          await el.scrollIntoViewIfNeeded();
          await page.waitForTimeout(600);
          const secPath = path.join(outputDir, `${sec.id}_${vp.name}.png`);
          await el.screenshot({ path: secPath });
          console.log(`Saved section ${sec.id}: ${secPath}`);
        } else {
          console.warn(`Element ${sec.selector} not found for ${vp.name}`);
        }
      } catch (err) {
        console.error(`Error capturing section ${sec.id}:`, err.message);
      }
    }

    await page.close();
  }

  await browser.close();
  console.log('Capture finished successfully.');
}

capture().catch((err) => {
  console.error('Fatal capture error:', err);
  process.exit(1);
});
