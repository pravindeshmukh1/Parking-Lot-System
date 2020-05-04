var owner = require(`./owner`);
var airportSecurity = require(`./airportSecurity`);
var chunk = require("lodash.chunk");

class ParkingLotSystem {
  constructor(
    totalNoOfLot,
    capacityOfEveryLot,
    totalVehiclesAllowInParkingLot
  ) {
    this.parkingLot;
    this.designParkingLot(totalNoOfLot, capacityOfEveryLot);
    this.noOfVehiclesAllowToPark = totalVehiclesAllowInParkingLot;
    this.noOfVehicles = 0;
  }

  designParkingLot(lotNo, capacityOfEveryLot) {
    this.parkingLot = [];
    for (let lot = 0; lot < lotNo; lot++) {
      this.parkingLot[lot] = [capacityOfEveryLot];
      for (let slot = 0; slot < capacityOfEveryLot; slot++) {
        this.parkingLot[lot][slot] = null;
      }
    }
  }
  park = (vehicle, dirverType, vehicleType) => {
    if (this.checkParkingLotFull() === false) {
      if (typeof vehicle === "object" || vehicle === null) {
        if (dirverType == "handicap") {
          this.checkEmptySlotForHandicapDriver(vehicle);
        } else if (vehicleType == "large") {
          this.checkEmptyLargeSlot(vehicle);
        } else if (dirverType == "normal" || vehicleType == "small")
          this.checkEmptySlotForNormalDriver(vehicle);
        this.parkingLot.push(vehicle);
        owner.informTime();
        return true;
      }
      throw new Error("Vehicle Must Be Object and not null");
    }
    return "Parking Lot Full";
  };

  checkEmptySlotForNormalDriver = (vehicle) => {
    for (let lot = 0; lot < this.parkingLot.length; lot++) {
      for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
        if (this.parkingLot[slot][lot] === null) {
          this.parkingLot[slot][lot] = vehicle;
          this.noOfVehicles++;
          this.checkParkingLotFull();
          return true;
        }
      }
    }
  };

  checkEmptySlotForHandicapDriver = (vehicle) => {
    for (let lot = 0; lot < this.parkingLot.length; lot++) {
      for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
        if (this.parkingLot[lot][slot] === null) {
          this.parkingLot[lot][slot] = vehicle;
          this.noOfVehicles++;
          this.checkParkingLotFull();
          return true;
        }
      }
    }
  };

  checkEmptyLargeSlot = (vehicle) => {
    let emptyArray = [];
    for (let lot = 0; lot < this.parkingLot.length; lot++) {
      let largelot = 0;
      for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
        if (this.parkingLot[lot][slot] === null) {
          largelot++;
        }
      }
      emptyArray[lot] = largelot - 1;
    }
    let largeLot = Math.max.apply(null, emptyArray);
    for (let slot = 0; slot < this.parkingLot[largeLot].length; slot++) {
      if (this.parkingLot[largeLot][slot] === null) {
        this.parkingLot[largeLot][slot] = vehicle;
        this.noOfVehicles++;
        this.checkParkingLotFull();
        return true;
      }
    }
    return false;
  };
  
  unparked = (vehicle) => {
    for (let lot = 0; lot < this.parkingLot.length; lot++) {
      for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
        if (this.parkingLot[lot][slot] == vehicle) {
          this.parkingLot[lot][slot] == null;
          this.noOfVehicles--;
          owner.notifyAvailable();
          owner.informTime();
          return true;
        }
      }
    }
    throw new Error("unknown vehicle");
  };

  checkParkingLotFull = () => {
    if (this.noOfVehicles === this.capacityOfParkingLot) {
      owner.notifyFull();
      airportSecurity.notifyFull();
      return true;
    }
    return false;
  };

  checkEmptySlots = () => {
    for (let lot = 0; lot < this.parkingLot.length; lot++) {
      for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
        if (this.parkingLot[lot][slot] === null) {
          let emptySlot = { lot: lot, slot: slot };
          return emptySlot;
        }
      }
    }
    return false;
  };

  findVehicle = (vehicle) => {
    for (let lot = 0; lot < this.parkingLot.length; lot++) {
      for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
        if (this.parkingLot[lot][slot] == vehicle) {
          let vehiclePosition = { lot: lot, slot: slot };
          return vehiclePosition;
        }
        return false;
      }
    }
  };
}
module.exports = ParkingLotSystem;
