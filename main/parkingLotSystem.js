let parkingLotMaxSize = 3;
class ParkingLotSystem {
  constructor() {
    this.parkingLot = [];
  }

  park(vehicle) {
    if (typeof vehicle === "object" && !this.isFull()) {
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
  isFull() {
    return this.parkingLotMaxSize;
  }
}
module.exports = ParkingLotSystem;
