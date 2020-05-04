var chai = require(`chai`),
  expect = chai.expect,
  assert = chai.assert;
var sinon = require(`sinon`);
var ParkingLotSystem = require(`../main/parkingLotSystem.js`);
var owner = require(`../main/owner`);
var airportSecurity = require(`../main/airportSecurity`);
var driver = require(`../main/driver`);
var vehicle = require(`../main/vehicle`);

describe("Testing Parking Lot System", () => {
  //UC1- Parking Lot is defined or not
  it(`should exist`, () => {
    expect(ParkingLotSystem).to.not.be.undefined;
  });

  //Park the Car in Parking Lot
  it(`should return true when given car when parked to catch the flight`, () => {
    let parkingLotSystem = new ParkingLotSystem(2, 2, 4);
    let cars = [{}, {}];
    cars.forEach((car) => {
      let driverType = driver.type.NORMAL;
      var res = parkingLotSystem.park(car, new Date(), driverType);
      expect(res).to.be.equal(true);
    });
  });

  //Car is other than object throw exception
  it(`should throw exception when given car as other then as object`, () => {
    let parkingLotSystem = new ParkingLotSystem(1, 1, 2);
    try {
      let car = 0;
      let driverType = driver.type.NORMAL;
      parkingLotSystem.park(car, driverType);
    } catch (e) {
      assert.equal(e.message, `Vehicle Must Be Object and not null`);
    }
  });
  //Car is other than object throw exception
  it(`should throw exception when given car as null as other then as object`, () => {
    let parkingLotSystem = new ParkingLotSystem(1, 1, 2);
    try {
      let car = null;
      let driverType = driver.type.NORMAL;
      parkingLotSystem.park(car, driverType);
    } catch (e) {
      assert.equal(e.message, `Vehicle Must Be Object and not null`);
    }
  });

  //UC2-Unpark the Car from Parking Lot
  it(`should return true when given car when unparked to go to home`, () => {
    let parkingLotSystem = new ParkingLotSystem(1, 1, 1);
    let car = {};
    let driverType = driver.type.NORMAL;
    assert.isTrue(parkingLotSystem.park(car, driverType));
    assert.isTrue(parkingLotSystem.unparked(car), true);
  });

  //Unparked the car those are not Parked should return false
  it(`should return throw exception when unparked the car those not park`, () => {
    let parkingLotSystem = new ParkingLotSystem(1, 1, 1);
    try {
      let car = {};
      let car1 = {};
      let driverType = driver.type.NORMAL;
      parkingLotSystem.park(car, driverType);
      parkingLotSystem.unparked(car, driverType);
      parkingLotSystem.unparked(car1);
    } catch (e) {
      assert.equal(e.message, "unknown vehicle");
    }
  });

  //Uc3-Check the Parking lot Full or not
  it(`should return messsage when parking lot full`, () => {
    let parkingLotSystem = new ParkingLotSystem(2, 2, 4);
    sinon
      .stub(parkingLotSystem, "checkParkingLotFull")
      .onFirstCall()
      .returns(false)
      .onSecondCall()
      .returns(true);
    let car = {};
    let car1 = {};
    let driverType = driver.type.NORMAL;
    assert.equal(true, parkingLotSystem.park(car, driverType));
    assert.equal(parkingLotSystem.park(car1), "Parking Lot Full");
    parkingLotSystem.checkParkingLotFull.restore();
  });

  // Notify the Parking Lot Owner When Parking Lot Full
  it(`should return true when notify owner given parking lot full`, () => {
    let parkingLotSystem = new ParkingLotSystem(1, 1, 2);
    let car = {};
    let car1 = {};
    let driverType = driver.type.NORMAL;
    expect(parkingLotSystem.park(car, driverType)).to.be.equal(true);
    parkingLotSystem.park(car1, driverType);
    expect(owner.notifyFull()).to.be.equal(true);
  });

  //UC4-Notify the Airport Security When Parking Lot Full
  it(`should return true when notify airport security given parking lot full`, () => {
    let parkingLotSystem = new ParkingLotSystem(1, 1, 2);
    let car = {};
    let car1 = {};
    let driverType = driver.type.NORMAL;
    expect(parkingLotSystem.park(car, driverType)).to.be.equal(true);
    let parked = parkingLotSystem.park(car1);
    expect(airportSecurity.notifyFull()).to.be.equal(true);
    // assert.equal(parked, "Parking Lot Full");
  });

  //UC5-Notify the Parking Lot Owner when Space is Available
  it(`should notify the owner when parking lot is Full`, () => {
    let parkingLotSystem = new ParkingLotSystem(1, 1, 2);
    let car = {};
    let driverType = driver.type.NORMAL;
    expect(parkingLotSystem.park(car, driverType)).to.be.equal(true);
    expect(parkingLotSystem.unparked(car, driverType)).to.be.equal(true);
    expect(owner.notifyAvailable()).to.be.equal(
      `Parking Lot Space is Available`
    );
  });
});

//UC6-Parking Lot Empty Slote Identification
describe(`Test the Parking Lot Position Availability`, () => {
  let parkingLotSystem;
  beforeEach(function () {
    parkingLotSystem = new ParkingLotSystem(2, 2, 4);
  });

  // UC6-Unparked the car so return the position
  it(`given cars when one car unparked at particular position available should return position`, () => {
    let car1 = {};
    let car2 = {};
    let driverType = driver.type.NORMAL;
    assert.isTrue(parkingLotSystem.park(car1, driverType));
    assert.isTrue(parkingLotSystem.park(car2, driverType));
    assert.isTrue(parkingLotSystem.unparked(car2, driverType));
    let emptySlots = parkingLotSystem.checkEmptySlots();
    assert.equal(emptySlots.lot, 0);
    assert.equal(emptySlots.slot, 1);
  });

  // Check the Empty Slot if not available return false
  it("given cars when checking for empty slot if no empty slot should return false", () => {
    let parkingLotSystem = new ParkingLotSystem(2, 2, 4);
    let cars = [
      { name: "Tata" },
      { name: "Ford" },
      { name: "Toyota" },
      { name: "Maruti" },
    ];
    let driverType = driver.type.NORMAL;
    cars.map((cars) => {
      assert.isTrue(parkingLotSystem.park(cars, driverType));
    });
    assert.equal(false, parkingLotSystem.checkEmptySlots());
  });

  //UC7-Find the Car in Parking Lot
  it(`given car when car present in parking lot should return car location`, () => {
    let car = {};
    let driverType = driver.type.NORMAL;
    assert.isTrue(parkingLotSystem.park(car, driverType));
    let findCar = parkingLotSystem.findVehicle(car);
    assert.equal(0, findCar.lot);
    assert.equal(0, findCar.slot);
  });

  //Find the Car in Parking Lot if not.
  it(`given car when car not present in parking lot should return false`, () => {
    let car = {};
    let driverType = driver.type.NORMAL;
    expect(parkingLotSystem.park(car, driverType)).to.be.equal(true);
    expect(parkingLotSystem.findVehicle(car.driverType)).to.be.equal(false);
  });

  //UC-8 Car Parking time inform to owner
  it(`given car when car parked time applied should return true`, () => {
    let car = {
      date: "new Date()",
    };
    let driverType = driver.type.NORMAL;
    let parkedCar = parkingLotSystem.park(car, driverType);
    parkingLotSystem.unparked(car);
    assert.isTrue(parkedCar);
  });

  //UC-10 Handicap Driver want to Park Car at Nearest Free Space
  it(`given handicap driver car when car parked at nearest free space should return true`, () => {
    let car1 = { name: "Tata" };
    let car2 = { name: "Ford" };
    assert.isTrue(parkingLotSystem.park(car1, driver.type.NORMAL));
    assert.isTrue(parkingLotSystem.park(car2, driver.type.HANDICAP));
    let result = parkingLotSystem.park(car2);
    expect(result, true);
  });

  //UC-11 Large Car want to Park Car at Large Free Space postion
  it(`given large car should search large free space for parked large car`, () => {
    let cars = [{ name: "Tata" }, { name: "Ford" }];
    let largeCar = vehicle.type.LARGE;
    cars.forEach((car) => {
      assert.isTrue(parkingLotSystem.park(car, largeCar));
    });
  });

  it(`given normal car should search large free space for parked normal car`, () => {
    let cars = [{ name: "Tata" }, { name: "Ford" }];
    let NormalCar = vehicle.type.NORMAL;
    cars.forEach((car) => {
      assert.isTrue(parkingLotSystem.park(car, NormalCar));
    });
  });
});
