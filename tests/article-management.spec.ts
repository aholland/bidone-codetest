import { test, expect } from '@playwright/test';
import './test-types.d'; // Just import for side effects (type augmentation)

test.describe.serial('Article Management Integration Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app to be ready
    await page.waitForFunction(() => window.__APP_READY__, { timeout: 10000 });
    await expect(page.locator('h1')).toContainText('Article management');
  });

  test('should create a new article and verify it appears in the list', async ({ page }) => {
    // Click New Article button
    const newArticleBtn = page.locator('button', { hasText: 'New Article' });
    await expect(newArticleBtn).toBeVisible();
    await newArticleBtn.click();
    
    // Wait for modal to open
    await page.waitForSelector('dialog[open]', { timeout: 10000 });
    
    // Fill in the form
    await page.fill('input[placeholder="Enter article title"]', 'Test Article from Playwright');
    await page.fill('input[placeholder="Enter author name"]', 'Test Author');
    
    // Check the "Publish" checkbox if it exists
    const publishCheckbox = page.locator('#published');
    if (await publishCheckbox.count() > 0) {
      await publishCheckbox.check();
    }
    
    // Submit the form - the button text depends on the status
    const submitBtn = page.locator('button').filter({ hasText: /Publish article|Create draft|Update Article/i });
    await submitBtn.click();
    
    // Wait for modal to close
    await page.waitForSelector('dialog[open]', { state: 'hidden', timeout: 10000 });
    // Use getByText to find the article containing the specific text
    const newArticle = page.locator('article').locator(':has(:text("Test Article from Playwright"))').first();
    await expect(newArticle).toBeVisible({ timeout: 10000 });
    
    // Verify the author is displayed
    await expect(newArticle).toContainText('Test Author');
  });

  test('should search for articles', async ({ page }) => {
    // Wait for app to be ready (initial load complete)
    await page.waitForFunction(() => window.__APP_READY__, { timeout: 10000 });
    
    // Now safe to interact - initial load is complete
    await page.waitForSelector('article', { timeout: 5000 });
    const initialCount = await page.locator('article').count();
    console.log(`Initial article count: ${initialCount}`);

    // Type in the search box
    const searchInput = page.locator('input[placeholder="Search articles by title..."]');
    await searchInput.click();
    await searchInput.fill('TypeScript');
    await searchInput.press('Enter'); // Trigger search (or you could dispatch input event)

    // Wait for search to complete
    await page.waitForFunction(
      () => window.__SEARCH_COMPLETE__ && 
            window.__LAST_SEARCH_QUERY__ === 'TypeScript',
      { timeout: 5000 }
    );

    // Now the search is complete, check results
    const articles = await page.locator('article').count();
    console.log(`Article count after search: ${articles}`);

    // Check for "no results" message
    const noResults = await page.locator('text=No articles found').count();
    if (noResults > 0) {
      console.log('No articles found message is displayed');
    }

    expect(articles).toBeGreaterThan(0);
    // Check that at least one article contains TypeScript
    const hasTypeScript = await page.locator('article:has-text("TypeScript")').count();
    expect(hasTypeScript).toBeGreaterThan(0);

    // Clear search
    await page.click('button[aria-label="Clear search"]');

    // Verify articles are shown again
    await page.waitForTimeout(400);
    const allArticles = await page.locator('article').count();
    expect(allArticles).toBe(initialCount);
  });

  test('should filter articles by status', async ({ page }) => {
    // Click on Draft filter
    const draftBtn = page.locator('button', { hasText: 'Draft' });
    await expect(draftBtn).toBeVisible();
    await draftBtn.click();
    
    // Verify only draft articles are shown
    const articles = page.locator('article');
    const count = await articles.count();
    
    for (let i = 0; i < count; i++) {
      await expect(articles.nth(i).locator('text=Draft')).toBeVisible();
    }
    
    // Click on Published filter
    const publishedBtn = page.locator('button', { hasText: 'Published' });
    await publishedBtn.click();
    
    // Verify only published articles are shown
    const publishedArticles = page.locator('article');
    const publishedCount = await publishedArticles.count();
    
    for (let i = 0; i < publishedCount; i++) {
      await expect(publishedArticles.nth(i).locator('text=Published')).toBeVisible();
    }
  });

  test('should edit an article', async ({ page }) => {
    // Click edit on the first article
    const firstArticle = page.locator('article').first();
    const editBtn = firstArticle.locator('button[aria-label*="Edit"]');
    await expect(editBtn).toBeVisible();
    await editBtn.click();
    
    // Wait for modal
    await page.waitForSelector('dialog[open]');
    
    // Modify the title
    const titleInput = page.locator('input[placeholder="Enter article title"]');
    await titleInput.clear();
    await titleInput.fill('Updated Article Title');
    
    // Submit
    const updateBtn = page.locator('button').filter({ hasText: 'Update Article' });
    await updateBtn.click();
    
    // Wait for modal to close
    await page.waitForSelector('dialog[open]', { state: 'hidden', timeout: 10000 });
    
    // Verify the updated title appears
    await expect(page.locator('article').first()).toContainText('Updated Article Title');
  });

  test('should switch themes', async ({ page }) => {
    // Verify initial theme
    const initialTheme = await page.locator('html').getAttribute('data-theme');
    console.log(`Initial theme: ${initialTheme}`);
    
    // Click dark theme button
    const darkButton = page.locator('button[aria-label="Switch to Dark theme"]');
    await expect(darkButton).toBeVisible();
    await darkButton.click();
    
    // Verify theme changed by checking data-theme attribute
    const darkTheme = await page.locator('html').getAttribute('data-theme');
    console.log(`Theme after clicking dark: ${darkTheme}`);
    expect(darkTheme).toBe('dark');
    
    // Click BidFood theme button
    const bidfoodButton = page.locator('button[aria-label="Switch to BidFood theme"]');
    await bidfoodButton.click();
    
    // Verify the heading is green in BidFood theme
    const headingColor = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      if (!h1) throw new Error('h1 element not found');
      return window.getComputedStyle(h1).color;
    });
    
    // RGB for #72C262 is rgb(114, 194, 98)
    expect(headingColor).toBe('rgb(114, 194, 98)');
  });

  test('should handle view-only mode', async ({ page }) => {
    // Enable view-only mode
    await page.check('#readOnlyMode');
    
    // Verify New Article button is hidden
    await expect(page.locator('button:has-text("New Article")')).not.toBeVisible();
    
    // Verify edit/delete buttons are hidden
    await expect(page.locator('button[aria-label*="Edit"]')).not.toBeVisible();
    await expect(page.locator('button[aria-label*="Delete"]')).not.toBeVisible();
    
    // Verify search still works
    const searchInput = page.locator('input[placeholder="Search articles by title..."]');
    await searchInput.fill('TypeScript');
    await searchInput.press('Enter');
    
    // Wait for search to complete
    await page.waitForFunction(
      () => window.__SEARCH_COMPLETE__ && 
            window.__LAST_SEARCH_QUERY__ === 'TypeScript',
      { timeout: 5000 }
    );
    
    const searchResults = await page.locator('article').count();
    expect(searchResults).toBeGreaterThan(0);
  });
});