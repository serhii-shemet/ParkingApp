import { Car, ParkingType } from "./types";
import ParkingLotManager from "./parkingLotManager"; 

const parkingLotManager = new ParkingLotManager();

// Create a parking lot with limitations
const parkingLotAId = "A";
const limitationsForParkingLotA = new Map<ParkingType, number>([
    [ParkingType.Trucks, 5],
    [ParkingType.ElectricCars, 0],
    [ParkingType.OrdinaryCars, 4],
]);

const parkingLotBId = "B";
const limitationsForParkingLotB = new Map<ParkingType, number>([
    [ParkingType.Trucks, 1],
    [ParkingType.ElectricCars, 0],
    [ParkingType.OrdinaryCars, 3],
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
console.log("Available spaces for ElectricCars:", parkingLot.getAvailableSpaces(ParkingType.ElectricCars));
console.log("Available spaces for OrdinaryCars:", parkingLot.getAvailableSpaces(ParkingType.OrdinaryCars));
console.log("Available spaces for Trucks:", parkingLot.getAvailableSpaces(ParkingType.Trucks));

// Park cars
const car1: Car = { id: "AA", type: ParkingType.ElectricCars };
const ticket1 = parkingLot.parkCar(car1);
console.log("Car 1 parked:", car1, ticket1);

const car2: Car = { id: "AB", type: ParkingType.OrdinaryCars };
const ticket2 = parkingLot.parkCar(car2);
console.log("Car 2 parked:", car2, ticket2);

const car3: Car = { id: "KA", type: ParkingType.Trucks };
const ticket3 = parkingLot.parkCar(car3);
console.log("Car 3 parked:", car3, ticket3);

// Get available spaces
console.log("Available spaces for ElectricCars:", parkingLot.getAvailableSpaces(ParkingType.ElectricCars));
console.log("Available spaces for OrdinaryCars:", parkingLot.getAvailableSpaces(ParkingType.OrdinaryCars));
console.log("Available spaces for Trucks:", parkingLot.getAvailableSpaces(ParkingType.Trucks));