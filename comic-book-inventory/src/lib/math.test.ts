import { expect, test, describe } from "bun:test";
import { add, subtract } from "./math";

describe("Math Utilities", () => {
  test("adds two numbers correctly", () => {
    expect(add(1, 2)).toBe(3);
  });

  test("adds negative numbers correctly", () => {
    expect(add(-1, -2)).toBe(-3);
  });

  test("adds positive and negative numbers correctly", () => {
    expect(add(-1, 2)).toBe(1);
  });

  test("subtracts two numbers correctly", () => {
    expect(subtract(5, 2)).toBe(3);
  });
});
