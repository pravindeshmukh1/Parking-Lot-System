class ParkingLotSystem {
  constructor() {
    this.parkingLot = [];
  }

  park(vehicle) {
    if (typeof vehicle === "object") {
      this.parkingLot.push(vehicle);
      return true;
    }
    return false;
  }
}
module.exports = ParkingLotSystem;
