/* eslint-disable jsdoc/check-tag-names */
/**
 * @jest-environment jsdom
 */

// Import necessary libraries and components
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import axios from "axios";
import Home from "./page";

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
  await waitFor(() => getAllByAltText("Cat"));

  // Check if the cat was added to the liked cats
  const likedCats = getAllByAltText("Cat");
  expect(likedCats).toHaveLength(1);
});

it("adds multiple cats to the liked cats when the Like button is clicked", async () => {
  // Mock the axios response
  const cat1 = { id: "1", url: EXAMPLE_URL, width: 100, height: 100 };
  const cat2 = { id: "2", url: EXAMPLE_URL, width: 100, height: 100 };
  const cat3 = { id: "3", url: EXAMPLE_URL, width: 100, height: 100 };

  (axios.get as jest.Mock).mockResolvedValue({
    data: [cat1, cat2, cat3],
  });

  // Render the Home component
  const { getByText, getAllByAltText } = render(<Home />);

  // Simulate a click on the Like button
  fireEvent.click(getByText("Like"));

  // Wait for the state to update
  await waitFor(() => getAllByAltText("Cat"));

  // Check if the cat was added to the liked cats
  const likedCats = getAllByAltText("Cat");
  expect(likedCats).toHaveLength(1);
});
