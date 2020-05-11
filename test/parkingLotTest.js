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
  let parkingLotSystem;
  beforeEach(function () {
    parkingLotSystem = new ParkingLotSystem(2, 2, 4);
  });
  //UC1- Parking Lot is defined or not
  it(`should exist`, () => {
    expect(ParkingLotSystem).to.not.be.undefined;
  });

  //Park the Car in Parking Lot
  it(`should return true when given car when parked to catch the flight`, () => {
    let cars = [{}, {}];
    cars.forEach((car) => {
      let driverType = driver.type.NORMAL;
      var res = parkingLotSystem.park(car, new Date(), driverType);
      expect(res).to.be.equal(true);
    });
  });

  //Car is other than object throw exception
  it(`should throw exception when given car as other then as object`, () => {
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
    let car = {};
    let driverType = driver.type.NORMAL;
    assert.isTrue(parkingLotSystem.park(car, driverType));
    assert.isTrue(parkingLotSystem.unparked(car), true);
  });

  //Unparked the car those are not Parked should return false
  it(`should return throw exception when unparked the car those not park`, () => {
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
    assert.isFalse(parkingLotSystem.park(car1));
    parkingLotSystem.checkParkingLotFull.restore();
  });

  // Notify the Parking Lot Owner When Parking Lot Full
  it(`should return true when notify owner given parking lot full`, () => {
    let car = {};
    let car1 = {};
    let driverType = driver.type.NORMAL;
    expect(parkingLotSystem.park(car, driverType)).to.be.equal(true);
    parkingLotSystem.park(car1, driverType);
    expect(owner.notifyFull()).to.be.equal(true);
  });

  //UC4-Notify the Airport Security When Parking Lot Full
  it(`should return true when notify airport security given parking lot full`, () => {
    let car = {};
    let car1 = {};
    let driverType = driver.type.NORMAL;
    expect(parkingLotSystem.park(car, driverType)).to.be.equal(true);
    parkingLotSystem.park(car1);
    expect(airportSecurity.notifyFull()).to.be.equal(true);
  });

  //UC5-Notify the Parking Lot Owner when Space is Available
  it(`should notify the owner when parking lot is Full`, () => {
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
    let car1 = { name: "Tata", driverType: driver.type.HANDICAP };
    let car2 = { name: "Ford", driverType: driver.type.HANDICAP };
    assert.isTrue(parkingLotSystem.park(car1));
    assert.isTrue(parkingLotSystem.checkEmptySlotForHandicapDriver(car2));
  });

  //UC-11 Large Car want to Park Car at Large Free Space postion
  it(`given large car should search large free space for parked large car`, () => {
    let cars = [{ name: "Tata" }, { name: "Ford" }];
    let largeCar = vehicle.type.LARGE;
    cars.forEach((car) => {
      assert.isTrue(parkingLotSystem.park(car, largeCar));
    });
    assert.isTrue(parkingLotSystem.checkEmptyLargeSlot(cars));
  });

  //Large Car want to Park Car at Large Free Space postion if not availabe space return false
  it(`given large car when large space not availabe should return false`, () => {
    sinon
      .stub(parkingLotSystem, "checkEmptyLargeSlot")
      .onFirstCall()
      .returns(true)
      .onSecondCall()
      .returns(false);
    let cars = [{ name: "Tata" }, { name: "Ford" }];
    let largeCar = vehicle.type.LARGE;
    cars.forEach((car) => {
      assert.isTrue(parkingLotSystem.park(car, largeCar));
    });
    assert.isTrue(parkingLotSystem.checkEmptyLargeSlot(cars));
    assert.isFalse(parkingLotSystem.checkEmptyLargeSlot(cars));
  });

  //UC-12 Search All white Vehicle in Parking Lot
  it(`give multiple color cars should search white cars in parking lot`, () => {
    let cars = [
      { name: "Ford", color: "Red" },
      { name: "Tata", color: "White" },
      { name: "Toyota", color: "Black" },
      { name: "Maruti", color: "White" },
    ];
    let driverType = driver.type.NORMAL;
    cars.forEach((car) => {
      assert.isTrue(parkingLotSystem.park(car, driverType));
    });
    searchParameter = {
      color: "White",
    };
    let car = parkingLotSystem.checkVehicle(searchParameter);
    assert.equal(car[0].lot, 1);
    assert.equal(car[0].slot, 0);
    assert.equal(car[1].lot, 1);
    assert.equal(car[1].slot, 1);
  });

  // UC-13 Search the Cars in Parking Lot as per Number Plate, Company Name and Color
  it(`given multiple cars when parked in parking lot should return cars as per numberplate,color,company name`, () => {
    let totalCars = [
      { numberPlate: "MH.05.AZ.7777", company: "Toyota", color: "White" },
      { numberPlate: "MH.05.AX.4545", company: "Toyota", color: "Blue" },
      { numberPlate: "MH.05.DD.5555", company: "Mahindra", color: "Black" },
      { numberPlate: "MH.05.YT.0101", company: "Toyota", color: "Blue" },
    ];
    let driverType = driver.type.NORMAL;
    totalCars.forEach((car) => {
      assert.isTrue(parkingLotSystem.park(car, driverType));
    });
    searchParameter = {
      numberPlate: "MH.05.AX.4545",
      company: "Toyota",
      color: "Blue",
    };
    let car = parkingLotSystem.checkVehicle(searchParameter);
    assert.equal(car[0].lot, 1);
    assert.equal(car[0].slot, 0);
  });

  // UC-14 Search the Cars in Parking Lot as per Company Name
  it(`given multiple cars when parked in parking lot should return cars as per company name`, () => {
    let totalCars = [
      { numberPlate: "MH.05.AZ.7777", company: "Toyota", color: "White" },
      { numberPlate: "MH.05.AX.4545", company: "Bmw", color: "Blue" },
      { numberPlate: "MH.05.DD.5555", company: "Bmw", color: "Blue" },
      { numberPlate: "MH.05.YT.0101", company: "Bmw", color: "Silver" },
    ];
    let driverType = driver.type.NORMAL;
    totalCars.forEach((car) => {
      assert.isTrue(parkingLotSystem.park(car, driverType));
    });
    searchParameter = {
      company: "Bmw",
      color: "Blue",
    };
    let car = parkingLotSystem.checkVehicle(searchParameter);
    assert.equal(car[0].lot, 0);
    assert.equal(car[0].slot, 1);
    assert.equal(car[1].lot, 1);
    assert.equal(car[1].slot, 0);
  });

  describe(`Find the Vehicle in Parking Lot`, () => {
    let parkingLotSystem;
    beforeEach(function () {
      parkingLotSystem = new ParkingLotSystem(2, 2, 4);
    });

    //UC-15 Find the Vehicle Parked at Last 30 min in Parking Lot
    it(`given cars when find the car in parking lot in last 30 min should return car position`, () => {
      let date = new Date();
      let parkedTime = date.getMinutes() - 30;
      let time = 30;
      let totalCars = [
        {
          numberPlate: "MH.05.AZ.7777",
          company: "Toyota",
          color: "White",
          parkedTime: parkedTime,
        },
        {
          numberPlate: "MH.05.AX.4545",
          company: "Toyota",
          color: "Blue",
        },
        {
          numberPlate: "MH.05.DD.5555",
          company: "Mahindra",
          color: "Black",
        },
        {
          numberPlate: "MH.05.YT.0101",
          company: "Toyota",
          color: "Blue",
        },
      ];
      totalCars.forEach((car) => {
        assert.isTrue(parkingLotSystem.park(car));
        let carParkedTime = parkingLotSystem.checkVehileParkedBeforeMinutes(
          time
        );
        assert.equal(carParkedTime[0].lot, 0);
        assert.equal(carParkedTime[0].slot, 0);
      });
    });

    //UC-16 Find the Vehicle Parked at Parking Lot According Vehicle and Driver Type
    it(`given cars when find the all handicap and small type cars should return car position`, () => {
      parkingLotSystem = new ParkingLotSystem(3, 2, 6);
      let totalCars = [
        {
          numberPlate: "MH.05.AZ.7777",
          company: "Toyota",
          color: "White",
          driverType: driver.type.HANDICAP,
          vehicleType: vehicle.type.SMALL,
          parkingTime: new Date(),
        },
        {
          numberPlate: "MH.05.AX.4545",
          company: "Toyota",
          color: "Blue",
          driverType: driver.type.NORMAL,
          vehicleType: vehicle.type.SMALL,
          parkingTime: new Date(),
        },
        {
          numberPlate: "MH.05.AX.5555",
          company: "Maruti",
          color: "Silver",
          driverType: driver.type.NORMAL,
          vehicleType: vehicle.type.SMALL,
          parkingTime: new Date(),
        },
        {
          numberPlate: "MH.05.ZA.3333",
          company: "Mahindra",
          color: "black",
          driverType: driver.type.HANDICAP,
          vehicleType: driver.type.SMALL,
          parkingTime: new Date(),
        },
        {
          numberPlate: "MH.05.ZA.3333",
          company: "Tata",
          color: "White",
          driverType: driver.type.HANDICAP,
          vehicleType: driver.type.SMALL,
          parkingTime: new Date(),
        },
        {
          numberPlate: "MH.05.ZA.1111",
          company: "Toyota",
          color: "black",
          driverType: driver.type.HANDICAP,
          vehicleType: driver.type.SMALL,
          parkingTime: new Date(),
        },
      ];
      totalCars.forEach((car) => {
        assert.isTrue(parkingLotSystem.park(car));
      });
      searchParameter = {
        driverType: "handicap",
      };
      let rows = [0, 2];
      let parkedCar = parkingLotSystem.checkVehicle(searchParameter, rows);
      assert.equal(parkedCar[0].lot, 0);
      assert.equal(parkedCar[0].slot, 0);
      assert.equal(parkedCar[1].lot, 0);
      assert.equal(parkedCar[1].slot, 1);
      assert.equal(parkedCar[2].lot, 2);
      assert.equal(parkedCar[2].slot, 1);
    });

    // UC-16 Test Case To Find Car empty Object as Parameter.
    it(`given cars when search slot with empty parameter should throw exception`, function () {
      try {
        //parkingLotSystem = new ParkingLotSystem(2, 2, 4);
        let totalCars = [
          {
            numberPlate: "MH.05.AX.4545",
            company: "Toyota",
            color: "Blue",
            driverType: driver.type.NORMAL,
            vehicleType: vehicle.type.SMALL,
            parkingTime: new Date(),
          },
          {
            numberPlate: "MH.05.AX.5555",
            company: "Maruti",
            color: "Silver",
            driverType: driver.type.NORMAL,
            vehicleType: vehicle.type.SMALL,
            parkingTime: new Date(),
          },
          {
            numberPlate: "MH.05.ZA.3333",
            company: "Mahindra",
            color: "black",
            driverType: driver.type.HANDICAP,
            vehicleType: driver.type.SMALL,
            parkingTime: new Date(),
          },
          {
            numberPlate: "MH.05.ZA.3333",
            company: "Tata",
            color: "White",
            driverType: driver.type.HANDICAP,
            vehicleType: driver.type.SMALL,
            parkingTime: new Date(),
          },
        ];
        totalCars.forEach((car) => {
          assert.isTrue(parkingLotSystem.park(car));
        });
        let searchParameter = {};
        parkingLotSystem.checkVehicle(searchParameter);
      } catch (error) {
        assert.equal("Please Enter Correct Parameter", error.message);
      }
    });
  });
});
