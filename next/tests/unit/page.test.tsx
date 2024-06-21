/**
 * @jest-environment jsdom
 */

// Import necessary libraries and components
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import axios from "axios";
import Home from "../../src/app/page";
import { CatImage } from "@prisma/client";

jest.mock("axios");

const EXAMPLE_URL = "http://example.com";

it("adds a cat to the liked cats when the Like button is clicked", async () => {
  // Mock the axios response
  const cat = { id: "1", url: EXAMPLE_URL, width: 100, height: 100 };
  (axios.get as jest.Mock).mockResolvedValue({ data: cat });

  // Render the Home component
  const { getByText, getAllByAltText } = render(<Home />);

  // Simulate a click on the Like button
  fireEvent.click(getByText("Like"));

  // Wait for the state to update
  await waitFor(() => getAllByAltText("Cat image from TheCatAPI"));

  // Check if the cat was added to the liked cats
  const likedCats = getAllByAltText("Cat image from TheCatAPI");
  expect(likedCats).toHaveLength(1);
});

it("adds multiple cats to the liked cats when the Like button is clicked", async () => {
  // Mock the axios response
  const cat1: CatImage = {
    id: "1",
    url: EXAMPLE_URL,
    width: 100,
    height: 100,
    createdAt: new Date(),
  };
  const cat2: CatImage = {
    id: "2",
    url: EXAMPLE_URL,
    width: 100,
    height: 100,
    createdAt: new Date(),
  };
  const cat3: CatImage = {
    id: "3",
    url: EXAMPLE_URL,
    width: 100,
    height: 100,
    createdAt: new Date(),
  };

  (axios.get as jest.Mock).mockResolvedValue({
    data: [cat1, cat2, cat3],
  });

  // Render the Home component
  const { getByText, getAllByAltText } = render(<Home />);

  // Simulate a click on the Like button
  fireEvent.click(getByText("Like"));

  // Wait for the state to update
  await waitFor(() => getAllByAltText("Cat image from TheCatAPI"));

  // Check if the cat was added to the liked cats
  const likedCats = getAllByAltText("Cat image from TheCatAPI");
  expect(likedCats).toHaveLength(1);
});
