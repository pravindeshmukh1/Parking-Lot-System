class AirportSecurity {
    constructor() {
      this.full = false;
    }
  
    notifyFull() {
      return (this.full = true);
    }
  }
  module.exports = new AirportSecurity();
  