var chai = require(`chai`),
  expect = chai.expect,
  should = chai.should,
  assert = chai.assert;
var ParkingLotSystem = require(`../main/parkingLotSystem.js`);

describe(`ParkingLotSystem`, () => {
  let parkingLotSystem;
  beforeEach(`initset`, () => {
    parkingLotSystem = new ParkingLotSystem();
  });

  //UC1- Parking Lot is defined or not
  it(`should exist`, () => {
    expect(ParkingLotSystem).to.not.be.undefined;
  });

  //Park the Car in Parking Lot
  it(`should return true when given car when parked to catch the flight`, () => {
    let parkingLotSystem = new ParkingLotSystem();
    let car = {};
    let result = parkingLotSystem.park(car);
    assert.equal(result, true);
  });

  //Car is other than object throw exception
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
