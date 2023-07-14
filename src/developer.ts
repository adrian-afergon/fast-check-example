import { Freezer } from "./maxibon.js";

export class Developer {

  constructor(readonly name: string, readonly maxibonsToGrab: number) {
  }

  public grabMaxibonFrom(freezer: Freezer) {
    throw new Error('Not implemented');
  }

}
