import { Given, When, Then } from "@cucumber/cucumber";
import { ICustomWorld } from "./custom-world";
import { expect } from "@playwright/test";

Given("User visits homepage", async function (this: ICustomWorld) {
  const page = this.page!;
  await page.goto("localhost:3000");
});

When("Site is loaded", async function (this: ICustomWorld) {
  const page = this.page!;
  await page.waitForSelector("#mainheading");
});

Then("User sees the image", async function (this: ICustomWorld) {
  const page = this.page!;
  const image = await page.waitForSelector("#maincatimage");
  const isVisible = await image.isVisible();
  expect(isVisible).toBe(true);
});
