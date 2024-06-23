import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toContainText("Cats");
});

test("renders without crashing", async ({ page }) => {
  await page.goto("/");
  const title = await page.textContent("h1");
  expect(title).toBe("Tinder for Cats 🐈 ❤️");
});

test("displays a cat image after fetching", async ({ page }) => {
  await page.goto("/");
  await page.waitForSelector("img");
  const catImage = await page.$("img");
  expect(catImage).toBeTruthy();
});

test('loads a new image when "Like" is clicked', async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForSelector("img");
  await page.waitForTimeout(3000);
  const initialImageSrc = await page.$eval("img", (img) => img.src);
  await page.click("text=Like");
  await page.waitForTimeout(3000);
  const newImageSrc = await page.$eval("img", (img) => img.src);
  expect(newImageSrc).not.toBe(initialImageSrc);
});

test('loads a new image when "Dislike" is clicked', async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.waitForSelector("img");
  const initialImageSrc = await page.$eval("img", (img) => img.src);
  await page.click("text=Dislike");
  await page.waitForTimeout(1000);
  const newImageSrc = await page.$eval("img", (img) => img.src);
  expect(newImageSrc).not.toBe(initialImageSrc);
});
