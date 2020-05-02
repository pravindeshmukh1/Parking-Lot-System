var owner = require(`./owner`);
var airportSecurity = require(`./airportSecurity`);
var chunk = require("lodash.chunk");

class ParkingLotSystem {
  constructor() {
    this.parkingLot = [];
    this.evenlyDistribute = 4;
  }

  park = (vehicle) => {
    if (this.isFull()) {
      owner.notifyFull();
      airportSecurity.notifyFull();
      return "Parking Lot Full";
    } else {
      if (typeof vehicle != "object" || vehicle == null)
        throw new Error("Vehicle Must Be Object and not null");
      else {
        if (vehicle.valueOf() == "handicap") this.checkNearestFreeSpace();
        this.checkEmptySlots;
        this.parkingLot.push(vehicle);
        owner.informTime();
        return true;
      }
    }
  };

  unparked = (vehicle) => {
    for (let i = 0; i < this.parkingLot.length; i++) {
      if (this.parkingLot[i] == vehicle) {
        this.parkingLot.splice(i, 1, null);
        owner.notifyAvailable();
        owner.informTime();
        return true;
      }
    }
    throw new Error("unknown vehicle");
  };

  isFull = () => {
    let isFull = this.parkingLot.length === 100;
    return isFull;
  };

  checkEmptySlots = () => {
    for (let slot = 0; slot < this.parkingLot.length; slot++) {
      if (this.parkingLot[slot] == null) {
        return slot;
      }
    }
    return false;
  };

  findVehicle = (vehicle) => {
    for (let pos = 0; pos < this.parkingLot.length; i++) {
      if (this.parkingLot[pos] == vehicle) {
        return pos;
      }
      return false;
    }
  };

  evenlyDistribution = (evenlyDistribut) => {
    return chunk(this.parkingLot, evenlyDistribut);
  };

  checkNearestFreeSpace = () => {
    for (let pos = 0; pos < this.parkingLot.length; pos++) {
      if (this.parkingLot[pos] == `undefined`)
        this.parkingLot.fill(vehicle, pos, pos + 1);
      return pos;
    }
    return false;
  };
}
module.exports = ParkingLotSystem;
