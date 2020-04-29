class Owner {
  constructor() {
    this.full = false;
  }

  notifyFull() {
    return (this.full = true);
  }
  notifyAvailable() {
    return `Parking Lot Space is Available`;
  }
}
module.exports = new Owner();
