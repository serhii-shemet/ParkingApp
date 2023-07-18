"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const parkingLot_1 = require("./parkingLot");
// Create a parking lot with limitations
const parkingLotId = "A";
const limitations = new Map([
    [types_1.ParkingType.Trucks, 5],
    [types_1.ParkingType.ElectricCars, 10],
    [types_1.ParkingType.OrdinaryCars, 20],
]);
const parkingLot = new parkingLot_1.default(parkingLotId, limitations);
// Park cars
const car1 = { type: types_1.ParkingType.ElectricCars };
const ticket1 = parkingLot.parkCar(car1);
console.log("Car 1 parked:", ticket1);
const car2 = { type: types_1.ParkingType.OrdinaryCars };
const ticket2 = parkingLot.parkCar(car2);
console.log("Car 2 parked:", ticket2);
const car3 = { type: types_1.ParkingType.Trucks };
const ticket3 = parkingLot.parkCar(car3);
console.log("Car 3 parked:", ticket3);
// Retrieve cars
const retrieved1 = parkingLot.retrieveCar(ticket1);
console.log("Car 1 retrieved:", retrieved1);
const retrieved2 = parkingLot.retrieveCar(ticket2);
console.log("Car 2 retrieved:", retrieved2);
const retrieved3 = parkingLot.retrieveCar(ticket3);
console.log("Car 3 retrieved:", retrieved3);
// Get available spaces
console.log("Available spaces for ElectricCars:", parkingLot.getAvailableSpaces(types_1.ParkingType.ElectricCars));
console.log("Available spaces for OrdinaryCars:", parkingLot.getAvailableSpaces(types_1.ParkingType.OrdinaryCars));
console.log("Available spaces for Trucks:", parkingLot.getAvailableSpaces(types_1.ParkingType.Trucks));
//# sourceMappingURL=app.js.map