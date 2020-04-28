var chai = require(`chai`),
  expect = chai.expect,
  should = chai.should,
  assert = chai.assert;
var ParkingLotSystem = require(`../main/parkingLotSystem.js`);

describe(`ParkingLotSystem`, () => {
  //Parking Lot is defined or not
  it(`should exist`, () => {
    expect(ParkingLotSystem).to.not.be.undefined;
  });
  //UC1- Park the Car
  it(`should return true when given car when parked to catch the flight`, () => {
    let parkingLotSystem = new ParkingLotSystem();
    let car = {};
    let result = parkingLotSystem.park(car);
    assert.equal(result, true);
  });
  // car is other than object throw exception
  it(`should throw exception when given car as other then as object`, () => {
    try {
      let parkingLotSystem = new ParkingLotSystem();
      let car = 0;
      let result = parkingLotSystem.park(car);
    } catch (e) {
      assert.equal(e.message, `car must be object`);
    }
  });
});
