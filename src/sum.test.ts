import { expect, test } from "vitest";

const sum = (a, b) => {
  return a + b;
};

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).equal(3);
});
