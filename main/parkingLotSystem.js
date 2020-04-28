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

  unparked(vehicle) {
    if (this.parkingLot.includes(vehicle)) {
      this.parkingLot.pop(vehicle);
      return true;
    }
    throw new Error("unknown vehicle");
  }
}
module.exports = ParkingLotSystem;
