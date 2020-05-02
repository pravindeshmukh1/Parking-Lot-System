class AirportSecurity {
  constructor() {
    this.full = false;
  }

  notifyFull() {
    let notify = (this.full = true);
    return notify;
  }
}
module.exports = new AirportSecurity();
