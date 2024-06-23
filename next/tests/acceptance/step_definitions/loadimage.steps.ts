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

When("User clicks the like button", async function (this: ICustomWorld) {
  const page = this.page!;
  const imageSelector = "#maincatimage";
  await page.waitForSelector(imageSelector, { state: "visible" });
  this.initialImageSrc = await page.$eval(
    imageSelector,
    (img: HTMLImageElement) => img.src,
  );
  await page.click("text=Like");
  await page.waitForTimeout(1000);
  this.newImageSrc = await page.$eval(
    imageSelector,
    (img: HTMLImageElement) => img.src,
  );
});

When("User clicks the dislike button", async function (this: ICustomWorld) {
  const page = this.page!;
  const imageSelector = "#maincatimage";
  await page.waitForSelector(imageSelector, { state: "visible" });
  this.initialImageSrc = await page.$eval(
    imageSelector,
    (img: HTMLImageElement) => img.src,
  );
  await page.click("text=Dislike");
  await page.waitForTimeout(1000);
  this.newImageSrc = await page.$eval(
    imageSelector,
    (img: HTMLImageElement) => img.src,
  );
});

Then("A new image is loaded", async function (this: ICustomWorld) {
  expect(this.newImageSrc).not.toBe(this.initialImageSrc);
});

Then(
  "Image is added to Three recent liked cats",
  async function (this: ICustomWorld) {
    const page = this.page!;
    await page.waitForTimeout(1000);
    const likedImagesSrc = await page.$$eval(".liked-cat-image", (elements) =>
      elements.map((element) => {
        if (element instanceof HTMLImageElement) {
          return element.src;
        }
        return "";
      }),
    );

    const isImageAdded = likedImagesSrc.includes(this.initialImageSrc ?? "");
    expect(isImageAdded).toBe(true);
  },
);
