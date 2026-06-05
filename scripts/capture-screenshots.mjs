import { spawn } from 'child_process';
import { chromium, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function run() {
  const outputDir = './tests/screenshots';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Starting dev server on port 4173...');
  const serverProcess = spawn('node', ['scripts/dev-server.mjs'], {
    shell: true,
    stdio: 'ignore'
  });

  // Wait for server to spin up
  await new Promise(resolve => setTimeout(resolve, 2000));

  console.log('Launching Playwright Chromium (iPhone 14 emulation)...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ...devices['iPhone 14'],
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    deviceScaleFactor: 3, // Premium high-res
  });

  const page = await context.newPage();
  
  console.log('Navigating to http://localhost:4173/ ...');
  await page.goto('http://localhost:4173/');

  console.log('Waiting for splash screen to disappear...');
  await page.waitForSelector('#splash', { state: 'detached', timeout: 7000 });
  await page.waitForTimeout(600); // extra buffer for fade transition

  const takeScreenshot = async (name) => {
    const filePath = path.join(outputDir, `${name}.png`);
    console.log(`Saving screenshot: ${filePath}`);
    await page.screenshot({ path: filePath, fullPage: false });
  };

  // Tab 1: Home
  await takeScreenshot('01_home');

  // Tab 2: Collection
  console.log('Switching to Collection tab...');
  await page.click('nav.bottom-nav button[aria-label="Colecao"]');
  await page.waitForTimeout(400);
  await takeScreenshot('02_collection');

  // Tab 3: IA
  console.log('Switching to IA tab...');
  await page.click('nav.bottom-nav button[aria-label="IA"]');
  await page.waitForTimeout(400);
  await takeScreenshot('03_ia');

  // Tab 4: Care
  console.log('Switching to Cuidados tab...');
  await page.click('nav.bottom-nav button[aria-label="Cuidados"]');
  await page.waitForTimeout(400);
  await takeScreenshot('04_care');

  // Tab 5: Settings
  console.log('Switching to Ajustes tab...');
  await page.click('nav.bottom-nav button[aria-label="Ajustes"]');
  await page.waitForTimeout(400);
  await takeScreenshot('05_settings');

  console.log('Shutting down browser and dev server...');
  await browser.close();

  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', serverProcess.pid, '/f', '/t']);
  } else {
    serverProcess.kill('SIGTERM');
  }

  console.log('All screenshots captured successfully!');
  process.exit(0);
}

run().catch(err => {
  console.error('Failed to capture screenshots:', err);
  process.exit(1);
});
