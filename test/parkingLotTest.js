var expect = require(`chai`).expect;

describe(`ParkingLotSystem`, () => {
    it(`should exist`, () => {
        var ParkingLotSystem = require(`../main/parkingLotSystem.js`);
        expect(ParkingLotSystem).to.not.be.undefined;
    })
})