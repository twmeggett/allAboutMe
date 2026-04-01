import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Test } from "./Test";

test("loads and displays greeting", async () => {
  // ARRANGE
  render(<Test />);

  // ACT
  const heading = await screen.findByRole("heading");

  // ASSERT
  expect(heading).toHaveTextContent("Test");
});
