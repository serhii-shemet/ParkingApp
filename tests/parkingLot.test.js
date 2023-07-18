"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parkingLot_1 = require("../src/parkingLot");
const types_1 = require("../src/types");
describe("ParkingLot", () => {
    let parkingLot;
    beforeEach(() => {
        // Set up a fresh ParkingLot instance before each test
        const limitations = new Map([
            [types_1.ParkingType.Trucks, 1],
            [types_1.ParkingType.ElectricCars, 1],
            [types_1.ParkingType.OrdinaryCars, 0],
        ]);
        parkingLot = new parkingLot_1.default("A", limitations);
    });
    test("should park an electric car in an available electric parking space", () => {
        // Arrange
        const car = { id: "AA", type: types_1.ParkingType.ElectricCars };
        // Act
        const ticket = parkingLot.parkCar(car);
        // Assert
        expect(ticket).toBeTruthy(); // Expect a valid ticket to be returned
        expect(ticket === null || ticket === void 0 ? void 0 : ticket.parkingType).toBe(types_1.ParkingType.ElectricCars); // Expect the ticket to have the correct parking type
        expect(parkingLot.getAvailableSpaces(types_1.ParkingType.ElectricCars)).toBe(0); // Expect available spaces to decrease by 1
    });
    test("should park an electric car in an available truck parking space", () => {
        // Arrange
        const car1 = { id: "AA", type: types_1.ParkingType.ElectricCars };
        const car2 = { id: "AB", type: types_1.ParkingType.ElectricCars };
        // Act
        const ticket1 = parkingLot.parkCar(car1);
        const ticket2 = parkingLot.parkCar(car2);
        // Assert
        expect(ticket1).toBeTruthy(); // Expect a valid ticket to be returned
        expect(ticket1 === null || ticket1 === void 0 ? void 0 : ticket1.parkingType).toBe(types_1.ParkingType.ElectricCars); // Expect the ticket to have the correct parking type
        expect(ticket2 === null || ticket2 === void 0 ? void 0 : ticket2.parkingType).toBe(types_1.ParkingType.Trucks); // Expect the ticket to have the correct parking type
        expect(parkingLot.getAvailableSpaces(types_1.ParkingType.Trucks)).toBe(0); // Expect available spaces to decrease by 1
    });
    test("should return null when no available space for the car type", () => {
        // Arrange
        const car1 = { id: "AA", type: types_1.ParkingType.ElectricCars };
        const car2 = { id: "AB", type: types_1.ParkingType.ElectricCars };
        const car3 = { id: "AC", type: types_1.ParkingType.ElectricCars };
        // Act
        parkingLot.parkCar(car1);
        parkingLot.parkCar(car2);
        const ticket = parkingLot.parkCar(car3);
        // Assert
        expect(ticket).toBeNull(); // Expect null to be returned when no available space
    });
});
//# sourceMappingURL=parkingLot.test.js.map