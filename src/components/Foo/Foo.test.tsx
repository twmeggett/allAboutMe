import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Foo } from "./Foo";

test("loads and displays greeting", async () => {
  // ARRANGE
  render(<Foo />);

  // ACT
  const heading = await screen.findByRole("heading");

  // ASSERT
  expect(heading).toHaveTextContent("Foo");
});
