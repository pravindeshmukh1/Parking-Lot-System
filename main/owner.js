class Owner {
  constructor() {
    this.full = false;
  }

  notifyFull() {
    return (this.full = true);
  }
}
module.exports = new Owner();
