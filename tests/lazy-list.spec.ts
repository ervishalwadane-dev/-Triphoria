import { test, expect } from '@playwright/test';

test('Lazy List - load 15 items and verify statuses', async ({ page }) => {
  await page.goto('https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9');

  await page.getByRole('tab', { name: 'timing challenges' }).click();

  const loadMoreBtn = page.getByRole('button', { name: 'load more items' });

  const items = page.locator('[data-testid="lazy-item"], li, [role="listitem"]').filter({
    has: page.locator(':scope'),
  });

  let previousCount = await items.count();
  for (let i = 0; i < 3; i++) {
    await loadMoreBtn.click();

    await expect
      .poll(async () => {
        const c = await items.count();
        return c;
      })
      .toBeGreaterThan(previousCount);

    previousCount = await items.count();
  }

  await expect(items).toHaveCount(15);

  const active = page.getByText('status:'s*active');
  const pending = page.getByText('status:'s*pending');

  await expect(active.first()).toBeVisible();
  await expect(pending.first()).toBeVisible();
});
