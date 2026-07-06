import { test, expect } from '@playwright/test';

test('Dynamic IDs - select Beta without using id selectors', async ({ page }) => {
  await page.goto('https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9');

  await page.getByRole('tab', { name: 'flaky selectors' }).click();

  await page.getByRole('button', { name: 'regenerate all ids' }).click();

  const betaRow = page.getByText('beta').first();
  await expect(betaRow).toBeVisible();
  await betaRow.click();

  await expect(
    page.getByText('beta.*selected|selected.*beta')
      .or(page.getByText('beta').locator('..').getByText('selected'))
  ).toBeVisible();
});
