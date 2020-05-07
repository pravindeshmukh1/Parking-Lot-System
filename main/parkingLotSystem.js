var owner = require(`./owner`);
var airportSecurity = require(`./airportSecurity`);

class ParkingLotSystem {
  constructor(totalNoOfLot, capacityOfEveryLot, capacityOfParkingLot) {
    this.parkingLot;
    this.designParkingLot(totalNoOfLot, capacityOfEveryLot);
    this.capacityOfParkingLot = capacityOfParkingLot;
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
    return "no large space available";
  };

  checkSpecificColorVehicle = (color) => {
    this.vehicles = [];
    for (let lot = 0; lot < this.parkingLot.length; lot++) {
      for (let slot = 0; slot < this.parkingLot.length; slot++) {
        if (this.parkingLot[lot][slot] != null) {
          if (this.parkingLot[lot][slot].color === color) {
            let vehiclePosition = {
              lot: lot,
              slot: slot,
            };
            this.vehicles.push(vehiclePosition);
          }
        }
      }
    }
    return this.vehicles;
  };

  checkSpecificCompanyAndColorVehicle = (numberPlate, company, color) => {
    this.vehicles = [];
    for (let lot = 0; lot < this.parkingLot.length; lot++) {
      for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
        if (this.parkingLot[lot][slot] != null) {
          if (
            this.parkingLot[lot][slot].company === company &&
            this.parkingLot[lot][slot].color === color &&
            this.parkingLot[lot][slot].numberPlate === numberPlate
          ) {
            let vehiclePosition = {
              lot: lot,
              slot: slot,
            };
            this.vehicles.push(vehiclePosition);
          }
        }
      }
    }
    return this.vehicles;
  };

  checkSpecificCompanyVehicle = (company) => {
    this.vehicles = [];
    for (let lot = 0; lot < this.parkingLot.length; lot++) {
      for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
        if (this.parkingLot[lot][slot] != null) {
          if (this.parkingLot[lot][slot].company === company) {
            let vehiclePosition = {
              lot: lot,
              slot: slot,
            };
            this.vehicles.push(vehiclePosition);
          }
        }
      }
    }
    return this.vehicles;
  };

  checkVehileParkedBeforeMinutes = () => {
    this.vehicles = [];
    let minute = new Date().getMinutes();
    for (let lot = 0; lot < this.parkingLot.length; lot++) {
      for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
        if (this.parkingLot[lot][slot] != null) {
          if (minute - this.parkingLot[lot][slot].parkedTime <= 30) {
            let vehiclePosition = {
              lot: lot,
              slot: slot,
            };
            this.vehicles.push(vehiclePosition);
          }
        }
      }
    }
    return this.vehicles;
  };

  unparked = (vehicle) => {
    for (let lot = 0; lot < this.parkingLot.length; lot++) {
      for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
        if (this.parkingLot[lot][slot] == vehicle) {
          this.parkingLot[lot][slot] = null;
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
        if (this.parkingLot[lot][slot] === vehicle) {
          let vehiclePosition = { lot: lot, slot: slot };
          return vehiclePosition;
        }
        return false;
      }
    }
  };
}
module.exports = ParkingLotSystem;
