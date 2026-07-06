import { test, expect } from '@playwright/test';

test('Delayed Button Flow - confirm becomes enabled and shows success', async ({ page }) => {
  await page.goto('https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9');

  await page.getByRole('tab', { name: 'timing challenges' }).click();

  await page.getByRole('button', { name: 'start process' }).click();

  const confirmBtn = page.getByRole('button', { name: 'confirm action' });
  await expect(confirmBtn).toBeVisible();
  await expect(confirmBtn).toBeEnabled();

  await confirmBtn.click();

  await expect(page.getByText('success')).toBeVisible();
});
