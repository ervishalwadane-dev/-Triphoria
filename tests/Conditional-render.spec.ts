import { test, expect } from '@playwright/test';

test('Conditional Login - admin panel vs standard panel', async ({ page }) => {
  await page.goto('https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9');

  await page.getByRole('tab', { name: 'flaky selectors' }).click();


  await page.getByRole('button', { name: 'admin user' }).click();

  const adminPanel = page.getByText('admin panel');
  const standardPanel = page.getByText('standard panel');

  await expect(adminPanel).toBeVisible();
  await expect(standardPanel).toBeHidden();

 
  await page.getByRole('button', { name: 'logout' }).click();

  await page.getByRole('button', { name: 'standard user' }).click();

  await expect(standardPanel).toBeVisible();
  await expect(adminPanel).toBeHidden();
});
