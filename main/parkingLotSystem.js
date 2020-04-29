var owner = require(`./owner`);
var airportSecurity = require(`./airportSecurity`);

class ParkingLotSystem {
  constructor() {
    this.parkingLot = [];
  }

  park(vehicle) {
    if (this.isFull()) {
      owner.notifyFull();
      airportSecurity.notifyFull();
      return "Parking Lot Full";
    } else {
      if (typeof vehicle != "object") {
        throw new Error("car must be object");
      } else {
        for (let i = 0; i < this.parkingLot.length; i++) {
          if (this.parkingLot[i] == null) {
            this.parkingLot.fill(vehicle, i, i + 1);
          }
        }
        this.parkingLot.push(vehicle);
        return true;
      }
    }
  }

  unparked(vehicle) {
    for (let i = 0; i < this.parkingLot.length; i++) {
      if (this.parkingLot[i] == vehicle) {
        this.parkingLot.splice(i, 1, null);
        owner.notifyAvailable();
        return true;
      }
    }
    throw new Error("unknown vehicle");
  }

  isFull() {
    return this.parkingLot.length === 100;
  }

  checkEmptySlots() {
    for (let i = 0; i < this.parkingLot.length; i++) {
      if (this.parkingLot[i] == null) {
        return i;
      }
    }
    return false;
  }
}
module.exports = ParkingLotSystem;
