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

// test("displays error message when fetch fails", async ({ page }) => {
//   // This test would require you to mock the API response to return an error
//   await page.goto("/");
//   await page.waitForSelector(".error");
//   const errorMessage = await page.$(".error");
//   expect(errorMessage).toBeTruthy();
// });
