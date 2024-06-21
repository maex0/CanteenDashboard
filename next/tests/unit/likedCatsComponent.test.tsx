/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import RecentlyLikedCatsComponent from "../../src/components/likedCatsComponent";
import CatImageComponent from "../../src/components/catImageComponent";
import CatImage from "@/types/catImage";

jest.mock("../../src/components/catImageComponent", () => {
  return jest.fn(() => {});
});

describe("RecentlyLikedCatsComponent", () => {
  it('displays "No recent liked cats" when there are no cats', () => {
    render(<RecentlyLikedCatsComponent cats={[]} />);
    expect(screen.getByText("No recent liked cats")).toBeInTheDocument();
  });

  it('displays "No recent liked cats" when cats is undefined', () => {
    render(<RecentlyLikedCatsComponent cats={undefined} />);
    expect(screen.getByText("No recent liked cats")).toBeInTheDocument();
  });

  it("renders CatImageComponent for each cat in the array", () => {
    const cats: CatImage[] = [
      {
        id: "cat1",
        url: "http://example.com/cat1.jpg",
        width: 100,
        height: 100,
      },
      {
        id: "cat2",
        url: "http://example.com/cat2.jpg",
        width: 100,
        height: 100,
      },
      // Add more cats as needed
    ];
    render(<RecentlyLikedCatsComponent cats={cats} />);

    for (const cat of cats) {
      expect(CatImageComponent).toHaveBeenCalledWith({ cat: cat }, {});
    }
  });
});
