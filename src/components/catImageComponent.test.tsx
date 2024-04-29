/* eslint-disable jsdoc/check-tag-names */
/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import CatImage from "@/types/catImage";
import "@testing-library/jest-dom";
import CatImageComponent from "./catImageComponent";

describe("CatImageComponent", () => {
  it("displays loading spinner when cat is undefined", () => {
    render(<CatImageComponent cat={undefined} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays image when cat is defined", () => {
    const cat: CatImage = {
      id: "1",
      url: "http://example.com/cat.jpg",
      width: 100,
      height: 100,
      mime_type: "",
      breeds: [],
    };

    render(<CatImageComponent cat={cat} />);

    expect(screen.getByRole("img", { name: /cat/i })).toHaveAttribute(
      "src",
      cat.url,
    );
    expect(screen.getByRole("img", { name: /cat/i })).toHaveAttribute(
      "width",
      String(cat.width),
    );
    expect(screen.getByRole("img", { name: /cat/i })).toHaveAttribute(
      "height",
      String(cat.height),
    );
  });
});
