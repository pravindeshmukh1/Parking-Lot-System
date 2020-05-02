class Owner {
  constructor() {
    this.full = false;
  }

  notifyFull() {
    let notify = (this.full = true);
    return notify;
  }
  notifyAvailable() {
    return `Parking Lot Space is Available`;
  }
  informTime() {
    let date = new Date();
    return date;
  }
}
module.exports = new Owner();
