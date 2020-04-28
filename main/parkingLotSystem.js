class ParkingLotSystem {
  constructor() {
    this.parkingLot = [];
  }

  park(vehicle) {
    this.parkingLot.push(vehicle);
    return true;
  }
}
module.exports = ParkingLotSystem;
