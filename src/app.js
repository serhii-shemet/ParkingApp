"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const parkingLotManager_1 = require("./parkingLotManager");
const parkingLotManager = new parkingLotManager_1.default();
// Create a parking lot with limitations
const parkingLotAId = "A";
const limitationsForParkingLotA = new Map([
    [types_1.ParkingType.Trucks, 5],
    [types_1.ParkingType.ElectricCars, 0],
    [types_1.ParkingType.OrdinaryCars, 4],
]);
const parkingLotBId = "B";
const limitationsForParkingLotB = new Map([
    [types_1.ParkingType.Trucks, 1],
    [types_1.ParkingType.ElectricCars, 0],
    [types_1.ParkingType.OrdinaryCars, 3],
]);
parkingLotManager.createParkingLot(parkingLotAId, limitationsForParkingLotA);
parkingLotManager.createParkingLot(parkingLotBId, limitationsForParkingLotB);
let parkingLots = parkingLotManager.getParkingLots();
console.log("1", parkingLots);
parkingLotManager.editParkingLot(parkingLotAId, limitationsForParkingLotB);
parkingLots = parkingLotManager.getParkingLots();
console.log("1", parkingLots);
parkingLotManager.deleteParkingLot(parkingLotBId);
parkingLots = parkingLotManager.getParkingLots();
console.log("1", parkingLots);
const parkingLot = parkingLotManager.findParkingLot(parkingLotAId);
// Get available spaces
console.log("Available spaces for ElectricCars:", parkingLot.getAvailableSpaces(types_1.ParkingType.ElectricCars));
console.log("Available spaces for OrdinaryCars:", parkingLot.getAvailableSpaces(types_1.ParkingType.OrdinaryCars));
console.log("Available spaces for Trucks:", parkingLot.getAvailableSpaces(types_1.ParkingType.Trucks));
// Park cars
const car1 = { id: "AA", type: types_1.ParkingType.ElectricCars };
const ticket1 = parkingLot.parkCar(car1);
console.log("Car 1 parked:", car1, ticket1);
const car2 = { id: "AB", type: types_1.ParkingType.OrdinaryCars };
const ticket2 = parkingLot.parkCar(car2);
console.log("Car 2 parked:", car2, ticket2);
const car3 = { id: "KA", type: types_1.ParkingType.Trucks };
const ticket3 = parkingLot.parkCar(car3);
console.log("Car 3 parked:", car3, ticket3);
// Get available spaces
console.log("Available spaces for ElectricCars:", parkingLot.getAvailableSpaces(types_1.ParkingType.ElectricCars));
console.log("Available spaces for OrdinaryCars:", parkingLot.getAvailableSpaces(types_1.ParkingType.OrdinaryCars));
console.log("Available spaces for Trucks:", parkingLot.getAvailableSpaces(types_1.ParkingType.Trucks));
//# sourceMappingURL=app.js.map