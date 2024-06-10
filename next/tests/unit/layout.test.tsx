/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import RootLayout from "../../src/app/layout";

describe("RootLayout", () => {
  it("renders its children", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Child Component</div>
      </RootLayout>,
    );

    expect(getByText("Child Component")).toBeInTheDocument();
  });
});
