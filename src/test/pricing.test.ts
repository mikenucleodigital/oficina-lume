import { describe, expect, it } from "vitest";
import { yearlyPrice } from "@/lib/bookings";

describe("yearly pricing", () => {
  it("applies 15% discount to 12 months", () => {
    expect(yearlyPrice(29)).toBe(296);
    expect(yearlyPrice(59)).toBe(602);
    expect(yearlyPrice(99)).toBe(1010);
  });
});
