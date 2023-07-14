import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { Freezer } from "./maxibon.js";
import { Developer } from "./developer.js";

describe("Test based on properties", () => {
  it("test based on properties do not check values", () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
          return a + b === b + a;
        }
      ));
  });
});

// Freezer -> maxibons
// Developer -> grap maxibons from freezer
// Freezer -> notify when there are less than 2 maxibons
describe("Maxibon Kata", () => {
  it("Freezer could not have negative Maxibons when developers graped from it", () => {
    fc.assert(
      // We don't want to limit the number of maximum maxibons, so we use an integer.
      //  - (for know, later we can decide it and add a limit because we have no space at Freezer)
      // We don't want to limit the scenario to Karumi developers, so we use a generic array of developers.
      // These developers have not any limit of maxibons to grab or name restrictions.
      fc.property(fc.integer(), fc.array(fc.record({ name: fc.string(), maxibonsToGrab: fc.integer() })), (initialMaxibons, developers) => {
        const freezer = new Freezer(initialMaxibons);
        developers.map((developerParams) => {
          new Developer(developerParams.name, developerParams.maxibonsToGrab).grabMaxibonFrom(freezer);
        });
        return freezer.numberOfMaxibons >= 0;
      })
    )
  });

  describe("Developer", () => {
    it("decrease the Maxibons at freezer when developer grapes from it", () => {
      const freezer = new Freezer(10);
      const developer = new Developer("Pedro", 3);

      developer.grabMaxibonFrom(freezer);

      expect(freezer.numberOfMaxibons).toBe(7);
    });
  })


});
