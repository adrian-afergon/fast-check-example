export class Freezer {

  private constructor(private maxibons: number) {}

  get numberOfMaxibons() {
    return this.maxibons;
  }

  decreaseMaxibons(maxibonsToGrab: number) {
    this.maxibons -= maxibonsToGrab;
  }

  static startWith(number: number) {
    if (number < 0) {
      throw new Error("Freezer cannot start with negative maxibons")
    }
    return new Freezer(number);
  }
}


