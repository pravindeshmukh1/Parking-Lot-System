var chai = require(`chai`),
  expect = chai.expect,
  assert = chai.assert;
var sinon = require(`sinon`);
var ParkingLotSystem = require(`../main/parkingLotSystem`);
var owner = require(`../main/owner`);
var airportSecurity = require(`../main/airportSecurity`);
var driver = require(`../main/driver`);

describe(`Testing Parking Lot System`, () => {
  let parkingLotSystem;

  beforeEach(`initset`, () => {
    parkingLotSystem = new ParkingLotSystem();
    sinon
      .stub(parkingLotSystem, "checkParkingLotFull")
      .onFirstCall()
      .returns(false)
      .onSecondCall()
      .returns(true);
  });

  afterEach(`After restore`, () => {
    parkingLotSystem.checkParkingLotFull.restore();
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
      parkingLotSystem.park(car);
    } catch (e) {
      assert.equal(e.message, `Vehicle Must Be Object and not null`);
    }
  });

  //Car is other than object throw exception
  it(`should throw exception when given car as null as other then as object`, () => {
    try {
      let car = null;
      parkingLotSystem.park(car);
    } catch (e) {
      assert.equal(e.message, `Vehicle Must Be Object and not null`);
    }
  });

  //UC2-Unpark the Car from Parking Lot
  it(`should return true when given car when unparked to go to home`, () => {
    let car = {};
    parkingLotSystem.park(car);
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
    assert.isTrue(parkingLotSystem.park(car));
    assert.equal(parkingLotSystem.park(car1), "Parking Lot Full");
  });

  // Notify the Parking Lot Owner When Parking Lot Full
  it(`should return true when notify owner given parking lot full`, () => {
    let car = {};
    let car1 = {};
    expect(parkingLotSystem.park(car)).to.be.equal(true);
    parkingLotSystem.park(car1);
    expect(owner.notifyFull()).to.be.equal(true);
  });

  //UC4-Notify the Airport Security When Parking Lot Full
  it(`should return true when notify airport security given parking lot full`, () => {
    let car = {};
    let car1 = {};
    expect(parkingLotSystem.park(car)).to.be.equal(true);
    let parked = parkingLotSystem.park(car1);
    expect(airportSecurity.notifyFull()).to.be.equal(true);
    assert.equal(parked, "Parking Lot Full");
  });

  //UC5-Notify the Parking Lot Owner when Space is Available
  it(`should notify the owner when parking lot is Full`, () => {
    let car = {};
    expect(parkingLotSystem.park(car)).to.be.equal(true);
    expect(parkingLotSystem.unparked(car)).to.be.equal(true);
    expect(owner.notifyAvailable()).to.be.equal(
      `Parking Lot Space is Available`
    );
  });
});

//UC6-Parking Lot Empty Slote Identification
describe(`Test the Parking Lot Position Availability`, () => {
  let parkingLotSystem;
  beforeEach(`initset`, () => {
    parkingLotSystem = new ParkingLotSystem();
  });

  // Unparked the car so return the position
  it(`given cars when one car unparked at particular position available should return position`, () => {
    let cars = [
      { name: "Tata" },
      { name: "Ford" },
      { name: "Toyota" },
      { name: "Maruti" },
      { name: "Lamborghini" },
    ];
    cars.map((cars) => {
      parkingLotSystem.park(cars);
    });
    parkingLotSystem.unparked(cars[1]);
    let emptySlots = parkingLotSystem.checkEmptySlotsForNormalDriver();
    assert.equal(emptySlots, 1);
  });

  //UC7-Find the Car in Parking Lot
  it(`given car when car present in parking lot should return car location`, () => {
    let cars = [
      { name: "Tata" },
      { name: "Ford" },
      { name: "Toyota" },
      { name: "Maruti" },
      { name: "Lamborghini" },
    ];
    cars.map((cars) => {
      parkingLotSystem.park(cars);
    });
    let findCar = parkingLotSystem.findVehicle(cars[1]);
    assert.equal(findCar, 1);
  });

  //Find the Car in Parking Lot if not.
  it(`given car when car not present in parking lot should return false`, () => {
    let car = {};
    expect(parkingLotSystem.park(car)).to.be.equal(true);
    expect(parkingLotSystem.unparked(car)).to.be.equal(true);
    expect(parkingLotSystem.findVehicle(car)).to.be.equal(false);
  });

  //UC-8 Car Parking time inform to owner
  it(`given car when car parked time applied should return true`, () => {
    let car = {
      date: "new Date()",
    };
    let parkedCar = parkingLotSystem.park(car);
    parkingLotSystem.unparked(car);
    assert.isTrue(parkedCar);
  });

  //UC-9 Cars Parking Evenly Distribution on Parking Lot
  it(`given cars when cars evenly destribut and  parked in parking lot should return true`, () => {
    let cars = [
      { name: "Tata" },
      { name: "Ford" },
      { name: "Toyota" },
      { name: "Maruti" },
      { name: "Lamborghini" },
      { name: "Audi" },
      { name: "BMW" },
      { name: "Honda" },
      { name: "Mahindra" },
    ];
    cars.map((cars) => {
      parkingLotSystem.park(cars);
    });
    let evenlyDistribut = parkingLotSystem.evenlyDistribution(3);
    expect(evenlyDistribut, true);
  });

  //UC-10 Handicap Driver want to Park Car at Nearest Free Space
  it(`given handicap driver car when car parked at nearest free space should return true`, () => {
    let car1 = { name: "Tata" };
    let car2 = { name: "Ford" };
    let car3 = { name: "Mahindra" };
    let normalDriver = driver.type.NORMAL;
    let handicapDriver = driver.type.HANDICAP;
    parkingLotSystem.park(car1, normalDriver);
    parkingLotSystem.park(car2, normalDriver);
    let result = parkingLotSystem.park(car3, handicapDriver);
    expect(result, true);
  });

  // Multiple Handicap Driver want to Park Car at Nearest Free Space
  it(`given multiple handicap driver cars when parked at nearest free space should return true`, () => {
    let cars = [
      { name: "Tata" },
      { name: "Ford" },
      { name: "Toyota" },
      { name: "Audi" },
    ];
    let handicapDriver = driver.type.HANDICAP;
    cars.map((cars) => {
      assert.isTrue(parkingLotSystem.park(cars, handicapDriver));
    });
  });
  // Multiple Handicap Driver want to Park Car at Nearest Free Space and return Position
  it(`given cars when one car unparked at particular position available should return position`, () => {
    let cars = [
      { name: "Tata" },
      { name: "Ford" },
      { name: "Toyota" },
      { name: "Maruti" },
      { name: "Lamborghini" },
    ];
    let normalDriver = driver.type.NORMAL;
    let handicapDriver = driver.type.HANDICAP;

    assert.isTrue(parkingLotSystem.park(cars[0], normalDriver));
    assert.isTrue(parkingLotSystem.park(cars[1], normalDriver));
    assert.isTrue(parkingLotSystem.park(cars[2], normalDriver));
    assert.isTrue(parkingLotSystem.park(cars[3], handicapDriver));
    assert.isTrue(parkingLotSystem.park(cars[4], handicapDriver));

    assert.isTrue(parkingLotSystem.unparked(cars[2]));
    let emptySlots = parkingLotSystem.checkEmptySlotsForHandicapDriver();
    assert.equal(emptySlots, 2);
  });
});
