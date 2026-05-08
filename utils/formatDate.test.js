import { describe, it, expect } from "vitest";
import formatDate from "./formatDate";

describe("formatDate", () => {
  it("formats date in English", () => {
    expect(formatDate("2024-01-15", "en")).toBe("Posted on January 15, 2024");
  });

  it("formats date in Brazilian Portuguese", () => {
    expect(formatDate("2024-01-15", "pt-br")).toBe(
      "Postado em 15 de Janeiro de 2024"
    );
  });

  it("handles first month boundary (January)", () => {
    expect(formatDate("2024-01-01", "en")).toBe("Posted on January 01, 2024");
  });

  it("handles last month boundary (December)", () => {
    expect(formatDate("2024-12-31", "en")).toBe("Posted on December 31, 2024");
  });

  it("formats all months correctly in English", () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    months.forEach((month, i) => {
      const monthStr = String(i + 1).padStart(2, "0");
      expect(formatDate(`2024-${monthStr}-10`, "en")).toBe(
        `Posted on ${month} 10, 2024`
      );
    });
  });
});
