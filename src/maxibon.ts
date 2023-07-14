export class Freezer {

  constructor(private maxibons: number) {}

  get numberOfMaxibons() {
    return this.maxibons;
  }

  decreaseMaxibons(maxibonsToGrab: number) {
    this.maxibons -= maxibonsToGrab;
  }
}


