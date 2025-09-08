import { test, expect } from '@playwright/test';
import './test-types.d'; // Just import for side effects (type augmentation)

test.describe('Simple Article Management Test', () => {
  test('should load the page and interact with articles', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
    
    // Wait for app to be ready
    await page.waitForFunction(() => window.__APP_READY__, { timeout: 10000 });
    
    // Verify the page loaded
    await expect(page.locator('h1')).toContainText('Article management');
    
    // Verify articles are displayed
    await page.waitForSelector('article', { timeout: 5000 });
    const articleCount = await page.locator('article').count();
    expect(articleCount).toBeGreaterThan(0);
    
    // Test search functionality
    const searchInput = page.locator('input[placeholder="Search articles by title..."]');
    await searchInput.click();
    await searchInput.fill('Building');
    await searchInput.press('Enter');
    
    // Wait for search to complete
    await page.waitForFunction(
      () => window.__SEARCH_COMPLETE__ && 
            window.__LAST_SEARCH_QUERY__ === 'Building',
      { timeout: 5000 }
    );
    
    // Verify search results
    const searchResults = await page.locator('article').count();
    expect(searchResults).toBeGreaterThan(0);
    
    // Clear search by clicking the clear button (should be visible now)
    await page.click('button[aria-label="Clear search"]');
    
    // Test status filter - click Draft
    await page.click('button:has-text("Draft")');
    
    // Verify only draft articles are shown
    const draftArticles = page.locator('article');
    const draftCount = await draftArticles.count();
    if (draftCount > 0) {
      // Check first article has Draft badge
      const firstArticle = draftArticles.first();
      await expect(firstArticle).toContainText('Draft');
    }
    
    // Click All to reset
    await page.click('button:has-text("All")');
    
    // Test theme switching
    const lightThemeButton = page.locator('button[aria-label="Switch to Light theme"]');
    await lightThemeButton.click();
    
    // Verify theme applied (data-theme attribute should be set)
    const htmlElement = page.locator('html');
    const dataTheme = await htmlElement.getAttribute('data-theme');
    expect(dataTheme).toBe('light');
    
    // Switch to BidFood theme
    const bidfoodButton = page.locator('button[aria-label="Switch to BidFood theme"]');
    await bidfoodButton.click();
    
    // Verify BidFood theme applied
    const bidfoodTheme = await htmlElement.getAttribute('data-theme');
    expect(bidfoodTheme).toBe('bidfood');
    
    // Verify the heading is green in BidFood theme
    const headingColor = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      if (!h1) throw new Error('h1 element not found');
      return window.getComputedStyle(h1).color;
    });
    
    // RGB for #72C262 is rgb(114, 194, 98)
    expect(headingColor).toBe('rgb(114, 194, 98)');
    
    // Test view-only mode
    await page.check('#readOnlyMode');
    
    // Verify New Article button is not visible
    const newArticleButton = page.locator('button:has-text("New Article")');
    await expect(newArticleButton).not.toBeVisible();
    
    // Verify edit/delete buttons are not visible
    const editButtons = page.locator('button[aria-label*="Edit"]');
    await expect(editButtons.first()).not.toBeVisible();
  });
});