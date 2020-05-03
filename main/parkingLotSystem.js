var owner = require(`./owner`);
var airportSecurity = require(`./airportSecurity`);
var chunk = require("lodash.chunk");

class ParkingLotSystem {
  constructor() {
    this.parkingLot = [];
    this.evenlyDistribute = 3;
  }

  park = (vehicle, dirverType) => {
    if (this.checkParkingLotFull() === false) {
      if (typeof vehicle === "object" || vehicle === null) {
        if (dirverType == "handicap")
          this.checkEmptySlotsForHandicapDriver(vehicle);
        if (dirverType == "normal")
          this.checkEmptySlotsForNormalDriver(vehicle);
        this.parkingLot.push(vehicle);
        owner.informTime();
        return true;
      }
      throw new Error("Vehicle Must Be Object and not null");
    }
    return "Parking Lot Full";
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

  checkParkingLotFull = () => {
    if (this.parkingLot.length === 100) {
      owner.notifyFull();
      airportSecurity.notifyFull();
      return true;
    }
    return false;
  };

  checkEmptySlotsForNormalDriver = () => {
    for (let slot = 0; slot < this.parkingLot.length; slot++) {
      if (this.parkingLot[slot] == null) return slot;
    }
    return false;
  };

  checkEmptySlotsForHandicapDriver = () => {
    for (let pos = 0; pos < this.parkingLot.length; pos++) {
      if (this.parkingLot[pos] == null) return pos;
    }
    return false;
  };

  findVehicle = (vehicle) => {
    for (let pos = 0; pos < this.parkingLot.length; pos++) {
      if (this.parkingLot[pos] == vehicle) return pos;
    }
    return false;
  };

  evenlyDistribution = (evenlyDistribute) => {
    let evenlyDistribution = chunk(this.parkingLot, evenlyDistribute);
    return evenlyDistribution;
  };
}
module.exports = ParkingLotSystem;
