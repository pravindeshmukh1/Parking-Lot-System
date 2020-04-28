class ParkingLotSystem {
  constructor() {
    this.parkingLot = [];
  }

  park(vehicle) {
    if (typeof vehicle === "object") {
      this.parkingLot.push(vehicle);
      return true;
    }
    throw new Error("car must be object");
  }
}
module.exports = ParkingLotSystem;
