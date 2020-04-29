class ParkingLotSystem {
  constructor() {
    this.parkingLot = [];
  }

  park(vehicle) {
    if (!this.isFull()) {
      if (typeof vehicle === "object") {
        this.parkingLot.push(vehicle);
        return true;
      }
      throw new Error("car must be object");
    }
    return "Parking Lot Full";
  }

  unparked(vehicle) {
    if (this.parkingLot.includes(vehicle)) {
      this.parkingLot.pop(vehicle);
      return true;
    }
    throw new Error("unknown vehicle");
  }
  isFull() {
    return this.parkingLot.length === 1;
  }
}
module.exports = ParkingLotSystem;
