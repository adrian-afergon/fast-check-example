export class Freezer {

  constructor(private maxibons: number) {}

  get numberOfMaxibons() {
    return this.maxibons;
  }

  decreaseMaxibons(maxibonsToGrab: number) {
    throw new Error("Not implemented");
  }
}


