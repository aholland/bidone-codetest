import { test, expect } from '@playwright/test';

test('basic article management functionality', async ({ page }) => {
  // Go to the app
  await page.goto('/');
  
  // Wait for and verify the heading
  const heading = page.locator('h1');
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText('Article management');
  
  // Verify articles load
  await page.waitForSelector('article', { timeout: 10000 });
  
  // Count articles
  const articles = await page.locator('article').count();
  console.log(`Found ${articles} articles`);
  expect(articles).toBeGreaterThan(0);
  
  // Test theme switching by clicking the Light theme button
  const lightButton = page.locator('button[title="Light"]');
  if (await lightButton.count() > 0) {
    await lightButton.click();
    console.log('Clicked Light theme button');
  }
  
  // Verify search input exists
  const searchInput = page.locator('input[placeholder*="Search"]');
  await expect(searchInput).toBeVisible();
  
  // Type in search
  await searchInput.fill('test search');
  console.log('Typed in search');
  
  // Wait a bit for search to process
  await page.waitForTimeout(500);
  
  console.log('Test completed successfully');
});