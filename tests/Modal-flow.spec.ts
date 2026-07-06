import { test, expect } from '@playwright/test';

test('Modal Confirmation Flow - nested modal confirm closes both and shows confirmed', async ({ page }) => {
  await page.goto('https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9');

 
  await page.getByRole('tab', { name: 'responsive' }).click();


  await page.getByRole('button', { name: 'open modal' }).click();

  const parentDialog = page.getByRole('dialog').first();
  await expect(parentDialog).toBeVisible();
  await expect(parentDialog).toHaveAttribute('aria-modal', 'true');

  await parentDialog.getByRole('button', { name: 'show details' }).click();

  const nestedDialog = page.getByRole('dialog').last();
  await expect(nestedDialog).toBeVisible();
  await expect(nestedDialog).toHaveAttribute('aria-modal', 'true');

  await nestedDialog.getByRole('button', { name: 'confirm$'}).click();

  await expect(nestedDialog).toBeHidden();
  await expect(parentDialog).toBeHidden();

  await expect(page.getByText('confirmed')).toBeVisible();
});
