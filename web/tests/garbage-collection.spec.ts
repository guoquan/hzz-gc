import { test, expect } from '@playwright/test';

test.describe('HZZ-GC System Tests', () => {
  
  test('should load the Heap (Homepage) correctly', async ({ page }) => {
    await page.goto('/hzz-gc/en');
    
    // Check Title
    await expect(page).toHaveTitle(/HZZ-GC/);
    await expect(page.getByText('HZZ-GC').first()).toBeVisible();
    
    // Check stats are visible
    await expect(page.getByText('HEAP_SIZE')).toBeVisible();
    await expect(page.getByText('System.out.println')).toBeVisible();

    // Check that garbage cards are rendered
    // Based on mock data, we expect at least 5 cards initially
    // Targeting the card titles to be more specific than generic CSS classes
    const cards = page.locator('h3.text-lg.font-bold');
    await expect(cards).toHaveCount(5);
  });

  test('should filter garbage by Eden Space (New)', async ({ page }) => {
    await page.goto('/hzz-gc/en');
    
    // Click "Eden Space" filter
    await page.getByRole('button', { name: 'Eden Space' }).click();
    
    // "AI Stock Predictor" (NEW) should be visible
    await expect(page.getByText('AI Stock Predictor')).toBeVisible();
    
    // "WeChat History" (SURVIVOR) should NOT be visible
    await expect(page.getByText('WeChat History')).not.toBeVisible();
  });

  test('should search and find specific garbage', async ({ page }) => {
    await page.goto('/hzz-gc/en');
    
    // Type into search box
    await page.getByPlaceholder('Search heap...').fill('Cat');
    
    // Should find "Cat Meow Translator"
    await expect(page.getByText('Cat Meow Translator')).toBeVisible();
    
    // Should NOT find "Java"
    await expect(page.getByText('Json-to-Interface')).not.toBeVisible();
  });

  test('should navigate to Manifesto and back', async ({ page }) => {
    await page.goto('/hzz-gc/en');
    
    // Click "View Manifesto"
    await page.getByRole('link', { name: 'View Manifesto' }).click();
    
    // Verify URL
    await expect(page).toHaveURL(/.*manifesto/);
    
    // Verify Content
    await expect(page.getByText('0x00. Overview')).toBeVisible();
    await expect(page.getByText('middle-aged tech backbone')).toBeVisible();
    
    // Go back
    await page.getByRole('link', { name: 'Return to Heap' }).click();
    await expect(page).toHaveURL(/.*\/en/);
  });

});
