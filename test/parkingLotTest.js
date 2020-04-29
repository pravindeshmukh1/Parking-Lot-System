var chai = require(`chai`),
  expect = chai.expect,
  assert = chai.assert;
var sinon = require(`sinon`);
var ParkingLotSystem = require(`../main/parkingLotSystem`);
var owner = require(`../main/owner`);

describe(`ParkingLotSystem`, () => {
  let parkingLotSystem;

  beforeEach(`initset`, () => {
    parkingLotSystem = new ParkingLotSystem();
   sinon
      .stub(parkingLotSystem, "isFull")
      .onFirstCall()
      .returns(false)
      .onSecondCall()
      .returns(true);
  });

  afterEach(`After restore`, () => {
    parkingLotSystem.isFull.restore();
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
  it(`should return throw exception when unparked the car those not park`, () => {
    try {
      let car = {};
      let car1 = {};
      parkingLotSystem.park(car);
      parkingLotSystem.unparked(car);
      parkingLotSystem.unparked(car1);
    } catch (e) {
      assert.equal(e.message, "unknown vehicle");
    }
  });

  //Uc3-Check the Parking lot Full or not
  it(`should return messsage when parking lot full`, () => {
    let car = {};
    let car1 = {};
    parkingLotSystem.park(car);
    let parked = parkingLotSystem.park(car1);
    assert.equal(parked, "Parking Lot Full");
  });

  // Notify the Parking Lot Owner When Parking Lot Full
  it(`should return true when notify owner given parking lot full`, () => {
    let car = {};
    let car1 = {};
    expect(parkingLotSystem.park(car)).to.be.equal(true);
    parkingLotSystem.park(car1);
    expect(owner.notifyFull()).to.be.equal(true);
  });
});
