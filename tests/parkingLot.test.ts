import ParkingLot  from "../src/parkingLot";
import { Car, ParkingType } from "../src/types";

describe("ParkingLot", () => {
    let parkingLot: ParkingLot;

    beforeEach(() => {
        // Set up a fresh ParkingLot instance before each test
        const limitations = new Map<ParkingType, number>([
            [ParkingType.Trucks, 1],
            [ParkingType.ElectricCars, 1],
            [ParkingType.OrdinaryCars, 0],
        ]);
        parkingLot = new ParkingLot("A", limitations);
    });

    test("should park an electric car in an available electric parking space", () => {
        // Arrange
        const car: Car = { id: "AA", type: ParkingType.ElectricCars };

        // Act
        const ticket = parkingLot.parkCar(car);

        // Assert
        expect(ticket).toBeTruthy(); // Expect a valid ticket to be returned
        expect(ticket?.parkingType).toBe(ParkingType.ElectricCars); // Expect the ticket to have the correct parking type
        expect(parkingLot.getAvailableSpaces(ParkingType.ElectricCars)).toBe(0); // Expect available spaces to decrease by 1
    });

    test("should park an electric car in an available truck parking space", () => {
        // Arrange
        const car1: Car = { id: "AA", type: ParkingType.ElectricCars };
        const car2: Car = { id: "AB", type: ParkingType.ElectricCars };

        // Act
        const ticket1 = parkingLot.parkCar(car1);
        const ticket2 = parkingLot.parkCar(car2);

        // Assert
        expect(ticket1).toBeTruthy(); // Expect a valid ticket to be returned
        expect(ticket1?.parkingType).toBe(ParkingType.ElectricCars); // Expect the ticket to have the correct parking type
        expect(ticket2?.parkingType).toBe(ParkingType.Trucks); // Expect the ticket to have the correct parking type
        expect(parkingLot.getAvailableSpaces(ParkingType.Trucks)).toBe(0); // Expect available spaces to decrease by 1
    });

    test("should return null when no available space for the car type", () => {
        // Arrange
        const car1: Car = { id: "AA", type: ParkingType.ElectricCars };
        const car2: Car = { id: "AB", type: ParkingType.ElectricCars };
        const car3: Car = { id: "AC", type: ParkingType.ElectricCars };

        // Act
        parkingLot.parkCar(car1);
        parkingLot.parkCar(car2);
        const ticket = parkingLot.parkCar(car3);

        // Assert
        expect(ticket).toBeNull(); // Expect null to be returned when no available space
    });
});