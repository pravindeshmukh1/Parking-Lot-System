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
    this.parkingLot = [lotNo];
    for (let lot = 0; lot < lotNo; lot++) {
      this.parkingLot[lot] = [capacityOfEveryLot];
      for (let slot = 0; slot < capacityOfEveryLot; slot++) {
        this.parkingLot[lot][slot] = null;
      }
    }
  }

  park = (vehicle) => {
    if (this.checkParkingLotFull() === false) {
      if (typeof vehicle === "object" && vehicle != null) {
        if (vehicle.vehicleType === "large") this.checkEmptyLargeSlot(vehicle);
        if (vehicle.dirverType === "handicap") {
          this.checkEmptySlotForHandicapDriver(vehicle);
        } else {
          this.checkEmptySlotForNormalDriver(vehicle);
        }
        owner.informTime();
        return true;
      }
      throw new Error("Vehicle Must Be Object and not null");
    }
    return false;
  };

  checkEmptySlotForNormalDriver = (vehicle) => {
    for (let lot = 0; lot < this.parkingLot.length; lot++) {
      for (let slot = 0; slot < this.parkingLot.length; slot++) {
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

  checkVehicle = (searchParameter, rows) => {
    if (Object.keys(searchParameter).length === 0) {
      throw new Error("Please Enter Correct Parameter");
    }
    if (rows != undefined && rows.length != 0) {
      return this.checkVehicleInSpecificRow(searchParameter, rows);
    } else {
      let vehicles = [];
      let keys = Object.keys(searchParameter);
      let values = Object.values(searchParameter);
      for (let i = 0; i < keys.length; i++) {
        for (let lot = 0; lot < this.parkingLot.length; lot++) {
          for (let slot = 0; slot < this.parkingLot.length; slot++) {
            if (this.parkingLot[lot][slot] != null) {
              if (
                this.parkingLot[lot][slot][keys[i]] === values[i] &&
                this.parkingLot[lot][slot][keys[i + 1]] === values[i + 1]
              ) {
                let vehiclePosition = {
                  lot: lot,
                  slot: slot,
                };
                vehicles.push(vehiclePosition);
              }
            }
          }
        }
      }
      return vehicles;
    }
  };

  checkVehicleInSpecificRow = (searchParameter, rows) => {
    let noOfRows = rows.length;
    let vehicles = [];
    let keys = Object.keys(searchParameter);
    let values = Object.values(searchParameter);
    for (let i = 0; i < keys.length; i++) {
      for (let lot = 0; lot < noOfRows; lot++) {
        for (let slot = 0; slot < this.parkingLot[rows[lot]].length; slot++) {
          if (
            this.parkingLot[rows[lot]][slot] != null &&
            this.parkingLot[rows[lot]][slot] != undefined
          ) {
            if (
              this.parkingLot[rows[lot]][slot][keys[i]] === values[i] &&
              this.parkingLot[rows[lot]][slot][keys[i + 1]] === values[i + 1]
            ) {
              let vehiclePosition = {
                lot: rows[lot],
                slot: slot,
              };
              vehicles.push(vehiclePosition);
            }
          }
        }
      }
    }
    return vehicles;
  };

  checkVehileParkedBeforeMinutes = (minute) => {
    let vehicles = [];
    let currentTimeInMinute = new Date().getMinutes();
    if (minute != undefined) {
      for (let lot = 0; lot < this.parkingLot.length; lot++) {
        for (let slot = 0; slot < this.parkingLot[lot].length; slot++) {
          if (this.parkingLot[lot][slot] != null) {
            if (
              currentTimeInMinute - this.parkingLot[lot][slot].parkedTime <=
              minute
            ) {
              let vehiclePosition = {
                lot: lot,
                slot: slot,
              };
              vehicles.push(vehiclePosition);
            }
          }
        }
      }
    }
    return vehicles;
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
