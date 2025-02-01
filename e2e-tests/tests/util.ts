import { test, expect, Page } from '@playwright/test';
const UI_URL = 'http://localhost:5173';
export async function login(page: Page) {
    await page.goto(UI_URL);
    await page.getByRole('link', { name: 'Sign In' }).click();
    await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
    await page.locator('[name=email]').fill('1@1.com');
    await page.locator('[name=password]').fill('password123');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page.getByText('Logged in successfully')).toBeVisible();
}