import { test, expect } from '@playwright/test';

test.describe('HZZ-GC System Tests', () => {
  
  test('should load the Heap (Homepage) correctly', async ({ page }) => {
    await page.goto('/en');
    
    // Check Title
    await expect(page).toHaveTitle(/HZZ-GC/);
    await expect(page.getByText('HZZ-GC').first()).toBeVisible();
    
    // Check stats are visible
    await expect(page.getByText('HEAP_SIZE')).toBeVisible();
    await expect(page.getByText('System.out.println')).toBeVisible();

    // Check that garbage cards are rendered
    // Based on current mock data, we expect 4 items
    const cards = page.locator('h3.text-lg.font-bold');
    await expect(cards).toHaveCount(4);
    
    // Take screenshot of Homepage
    await page.screenshot({ path: 'test-results/screenshots/01-homepage.png', fullPage: true });
  });

  test('should filter garbage by Eden Space (New)', async ({ page }) => {
    await page.goto('/en');
    
    // Click "Eden Space" filter
    await page.getByRole('button', { name: 'Eden Space' }).click();
    
    // "Exifilm" (NEW) should be visible
    await expect(page.getByText('Exifilm')).toBeVisible();
    
    // "GT4T AI Box" (TENURED) should NOT be visible
    await expect(page.getByText('GT4T AI Box')).not.toBeVisible();

    // Take screenshot of Filtered View
    await page.screenshot({ path: 'test-results/screenshots/02-filtered-eden.png' });
  });

  test('should search and find specific garbage', async ({ page }) => {
    await page.goto('/en');
    
    // Type into search box
    await page.getByPlaceholder('Search heap...').fill('LinVis');
    
    // Should find "LinVis"
    await expect(page.getByText('LinVis')).toBeVisible();
    
    // Should NOT find "Exifilm"
    await expect(page.getByText('Exifilm')).not.toBeVisible();

    // Take screenshot of Search Results
    await page.screenshot({ path: 'test-results/screenshots/03-search-results.png' });
  });

  test('should navigate to Manifesto and back', async ({ page }) => {
    await page.goto('/en');
    
    // Click "View Manifesto"
    await page.getByRole('link', { name: 'View Manifesto' }).click();
    
    // Verify URL
    await expect(page).toHaveURL(/.*manifesto/);
    
    // Verify Content
    await expect(page.getByText('Overview', { exact: false })).toBeVisible();
    await expect(page.getByText('tech enthusiasts', { exact: false })).toBeVisible();

    // Take screenshot of Manifesto
    await page.screenshot({ path: 'test-results/screenshots/04-manifesto.png', fullPage: true });
    
    // Go back
    await page.getByRole('link', { name: 'Return to Heap' }).click();
    await expect(page).toHaveURL(/.*\/en/);
  });

});
