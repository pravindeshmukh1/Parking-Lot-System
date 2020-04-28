var chai = require(`chai`);
var expect = chai.expect;
var assert = require(`assert`);
var ParkingLotSystem = require(`../main/parkingLotSystem.js`);

describe(`ParkingLotSystem`, () => {
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
});
