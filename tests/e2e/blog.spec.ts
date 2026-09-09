import { expect, test } from '@playwright/test';

test('a visitor can navigate from home to a blog post', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

	await page.getByRole('link', { name: 'Blog', exact: true }).click();
	await expect(page).toHaveURL(/\/blog\/?$/);

	const firstPost = page.getByRole('main').getByRole('listitem').first().getByRole('link');
	const title = await firstPost.getByRole('heading').innerText();
	await firstPost.click();

	await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
});
