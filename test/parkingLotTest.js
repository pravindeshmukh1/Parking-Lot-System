var chai = require(`chai`),
  expect = chai.expect,
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
    let car = {};
    let result = parkingLotSystem.park(car);
    assert.equal(result, true);
  });

  //Car is other than object throw exception
  it(`should throw exception when given car as other then as object`, () => {
    try {
      let car = 0;
      let result = parkingLotSystem.park(car);
    } catch (e) {
      assert.equal(e.message, `car must be object`);
    }
  });

  //UC2-Unpark the Car from Parking Lot
  it(`should return true when given car when unparked to go to home`, () => {
    let car = {};
    let parked = parkingLotSystem.park(car);
    let unparked = parkingLotSystem.unparked(car);
    assert.isTrue(unparked);
  });

  //Unparked the car those are not Parked should return false
  it(`should return false when unparked the car those not park`, () => {
    let car = {};
    parkingLotSystem.park(car);
    parkingLotSystem.unparked(car);
    let unparked = parkingLotSystem.unparked(car);
    assert.isFalse(unparked);
  });
});
