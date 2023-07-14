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
    const randomDevelopers = fc.array(fc.record({ name: fc.string(), maxibonsToGrab: fc.integer() })
      .map(item => new Developer(item.name, item.maxibonsToGrab)));
    const randomInitialFreezerMaxibons = fc.integer({ min: 0 });
    fc.assert(
      fc.property(
        randomInitialFreezerMaxibons,
        randomDevelopers,
        (initialMaxibons, developers) => {
          const freezer = Freezer.startWith(initialMaxibons);
          developers.forEach((developer) => {
            developer.grabMaxibonFrom(freezer);
          });
          expect(freezer.numberOfMaxibons).toBeGreaterThanOrEqual(0);
        })
    );
  });

  describe("Developer", () => {
    it("decrease the Maxibons at freezer when developer grapes from it", () => {
      const freezer = Freezer.startWith(10);
      const developer = new Developer("Pedro", 3);

      developer.grabMaxibonFrom(freezer);

      expect(freezer.numberOfMaxibons).toBe(7);
    });
  });


  // This API has a delivered smell exposing the internal state of the object.
  describe("Freezer", () => {
    it("decrease the Maxibons at freezer when developer grapes from it", () => {
      const freezer = Freezer.startWith(10);

      freezer.decreaseMaxibons(3);

      expect(freezer.numberOfMaxibons).toBe(7);
    });

    it("not allows negative values when Freezer starts", () => {
      expect(() => {
        Freezer.startWith(-1);
      }).toThrowError("Freezer cannot start with negative maxibons");
    });

  });


});
