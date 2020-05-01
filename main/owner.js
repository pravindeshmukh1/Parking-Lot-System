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
  informTime() {
    return new Date();
  }
}
module.exports = new Owner();
