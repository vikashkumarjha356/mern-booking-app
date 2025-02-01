import { test, expect } from '@playwright/test';
import { login } from './util';
import path from 'path';
const UI_URL = 'http://localhost:5173';


test.beforeEach(async ({ page }) => {
    await login(page);
})

test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}/add-hotel`);
    await page.locator('[name=name]').fill('Test Hotel');
    await page.locator('[name=city]').fill('Test City');
    await page.locator('[name=country]').fill('Test Country');
    await page.locator('[name="description"]').fill('This is a description for the Test Hotel');
    await page.locator('[name="pricePerNight"]').fill('100');
    await page.selectOption('select[name="starRating"]', "3")
    await page.getByText('Budget').click();
    await page.getByLabel('Parking').check();
    await page.getByLabel('Free Wifi').check();
    await page.locator('[name="adultCount"]').fill('4');
    await page.locator('[name="childCount"]').fill('2');

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, 'files', '1.jpg'),
        path.join(__dirname, 'files', '2.jpg'),
    ])

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Hotel Added Successfully')).toBeVisible({ timeout: 10000 });
})

test("should display hotels", async ({ page }) => {
    await page.goto(`${UI_URL}/my-hotels`);
    await expect(page.getByText('Test Hotel1')).toBeVisible();
    await expect(page.getByText('Test City2, Test Country2')).toBeVisible();
    await expect(page.getByText('This is a description for the Test Hotels')).toBeVisible();
    await expect(page.getByText('Luxury')).toBeVisible();
    await expect(page.getByText('1000 per night')).toBeVisible();
    await expect(page.getByRole("link", { name: "View Details" }).nth(0)).toBeVisible();
})