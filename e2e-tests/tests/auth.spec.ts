import { test, expect, Page } from '@playwright/test';
import { login } from './util';
const UI_URL = 'http://localhost:5173';



test('should allow user to login', async ({ page }) => {
  await login(page);
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();


});

test('should allow user to register', async ({ page }) => {
  const email = `test-${Date.now()}@test.com`;
  const randomNumber = Math.floor(Math.random() * 10000);
  await page.goto(UI_URL);
  await page.getByRole('link', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  await page.getByRole('link', { name: 'Create an account here' }).click();
  await expect(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible();
  await page.locator('[name=firstName]').fill('test_firstName' + randomNumber);
  await page.locator('[name=lastName]').fill('test_lastName' + randomNumber);
  await page.locator('[name=email]').fill(email);
  await page.locator('[name=password]').fill('password123');
  await page.locator('[name=confirmpassword]').fill('password123');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByText('Account created successfully')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});
