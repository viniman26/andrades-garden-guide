import { test, expect } from '@playwright/test';

test.describe("Andrade's Garden Guide", () => {
  test.beforeEach(async ({ page }) => {
    // Forward browser console logs and errors to terminal
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

    // Navigate to the local server
    await page.goto('/');
  });

  test('Deve carregar e remover a tela de splash apos 2 segundos', async ({ page }) => {
    // Verify splash is visible initially
    const splash = page.locator('#splash');
    await expect(splash).toBeVisible();

    // Wait for splash to hide (2 seconds + fade out transition)
    await expect(splash).not.toBeAttached({ timeout: 5000 });

    // Verify main app content is visible
    const appHeader = page.locator('header.topbar');
    await expect(appHeader).toBeVisible();
  });

  test('Deve navegar pelas abas principais', async ({ page }) => {
    // Wait for splash screen to disappear
    await page.waitForSelector('#splash', { state: 'detached', timeout: 5000 });

    // We should be on Home tab initially
    await expect(page.locator('text=Seu jardim esta florescendo hoje')).toBeVisible();

    // Navigate to Colecao
    await page.click('nav.bottom-nav button[aria-label="Colecao"]');
    await expect(page.locator('text=Minha Colecao')).toBeVisible();

    // Navigate to IA
    await page.click('nav.bottom-nav button[aria-label="IA"]');
    await expect(page.locator('text=Identificar com IA')).toBeVisible();

    // Navigate to Cuidados
    await page.click('nav.bottom-nav button[aria-label="Cuidados"]');
    await expect(page.locator('text=Rotina local baseada nas plantas cadastradas.')).toBeVisible();

    // Navigate to Ajustes (Configuracoes)
    await page.click('nav.bottom-nav button[aria-label="Ajustes"]');
    await expect(page.locator('text=Configuracoes')).toBeVisible();
  });

  test('Deve abrir e fechar o modal de detalhes da planta', async ({ page }) => {
    // Wait for splash screen to disappear
    await page.waitForSelector('#splash', { state: 'detached', timeout: 5000 });

    // Click on the first plant card in Home highlights
    const firstCard = page.locator('.plant-card').first();
    await firstCard.click();

    // Verify modal is open
    const modal = page.locator('.plant-modal');
    await expect(modal).toBeVisible();

    // Verify we can close it clicking close button
    const closeBtn = page.locator('.close-modal');
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('Deve fechar o modal clicando no backdrop', async ({ page }) => {
    await page.waitForSelector('#splash', { state: 'detached', timeout: 5000 });

    // Open first plant modal
    await page.locator('.plant-card').first().click();
    const modal = page.locator('.plant-modal');
    await expect(modal).toBeVisible();

    // Click outside on backdrop (coordinates 5, 5 relative to backdrop element)
    const backdrop = page.locator('.modal-backdrop');
    await backdrop.click({ position: { x: 5, y: 5 } });
    await expect(modal).not.toBeVisible();
  });

  test('Deve permitir buscar plantas na aba Colecao', async ({ page }) => {
    await page.waitForSelector('#splash', { state: 'detached', timeout: 5000 });

    // Navigate to Colecao
    await page.click('nav.bottom-nav button[aria-label="Colecao"]');

    // Type query
    const searchInput = page.locator('#searchPlants');
    await searchInput.fill('Monstera');

    // Verify list updates
    const cardTitle = page.locator('.plant-grid .plant-card h3');
    await expect(cardTitle).toHaveText('Costela-de-Adao');

    // Search for non-existent plant
    await searchInput.fill('Inexistente');
    await expect(page.locator('.plant-grid .plant-card')).toHaveCount(0);
  });
});
