import { describe, it, expect } from "vitest";
import getOppositeFilenameSuffix from "./getOppositeFilenameSuffix";
import { FILENAME_END_EN, FILENAME_END_PT_BR } from "@/utils/constants";

describe("getOppositeFilenameSuffix", () => {
  it("returns the PT-BR suffix when lang is EN", () => {
    expect(getOppositeFilenameSuffix("en")).toBe(FILENAME_END_PT_BR);
  });

  it("returns the EN suffix when lang is PT-BR", () => {
    expect(getOppositeFilenameSuffix("pt-br")).toBe(FILENAME_END_EN);
  });
});
