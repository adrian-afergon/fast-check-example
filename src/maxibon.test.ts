import fc from 'fast-check'
import {describe, it} from "vitest";

describe("Test based on properties", () => {
  it("test based on properties do not check values", function() {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        return a + b === b + a
      }
    ))
  });
});

// Freezer -> maxibons
// Developer -> grap maxibons from freezer
// Freezer -> notify when there are less than 2 maxibons
