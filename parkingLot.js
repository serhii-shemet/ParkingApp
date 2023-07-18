"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
function findAvailableType(spaces, maxSpaceCount, type) {
    const availableSpaces = spaces.get(type) || new Set();
    if (availableSpaces.size < maxSpaceCount) {
        return type;
    }
    return undefined;
}
class ElectricCarParkingStrategy {
    constructor(limitations) {
        this.maxElectricSpaces = limitations.get(types_1.ParkingType.ElectricCars);
        this.maxOrdinarySpaces = limitations.get(types_1.ParkingType.OrdinaryCars);
        this.maxTruckSpaces = limitations.get(types_1.ParkingType.Trucks);
    }
    findParkingType(spaces) {
        return findAvailableType(spaces, this.maxElectricSpaces, types_1.ParkingType.ElectricCars)
            || findAvailableType(spaces, this.maxOrdinarySpaces, types_1.ParkingType.OrdinaryCars)
            || findAvailableType(spaces, this.maxTruckSpaces, types_1.ParkingType.Trucks);
    }
}
class OrdinaryCarParkingStrategy {
    constructor(limitations) {
        this.maxOrdinarySpaces = limitations.get(types_1.ParkingType.OrdinaryCars);
        this.maxTruckSpaces = limitations.get(types_1.ParkingType.Trucks);
    }
    findParkingType(spaces) {
        return findAvailableType(spaces, this.maxOrdinarySpaces, types_1.ParkingType.OrdinaryCars)
            || findAvailableType(spaces, this.maxTruckSpaces, types_1.ParkingType.Trucks);
    }
}
class TruckParkingStrategy {
    constructor(limitations) {
        this.maxTruckSpaces = limitations.get(types_1.ParkingType.Trucks);
    }
    findParkingType(spaces) {
        return findAvailableType(spaces, this.maxTruckSpaces, types_1.ParkingType.Trucks);
    }
}
class ParkingLot {
    constructor(id, limitations) {
        this.id = id;
        this.limitations = limitations;
        this.spaces = new Map;
        this.parkingStrategies = new Map;
        this.initializeParkingStrategies(limitations);
    }
    initializeParkingStrategies(limitations) {
        this.parkingStrategies.set(types_1.ParkingType.Trucks, new TruckParkingStrategy(limitations));
        this.parkingStrategies.set(types_1.ParkingType.ElectricCars, new ElectricCarParkingStrategy(limitations));
        this.parkingStrategies.set(types_1.ParkingType.OrdinaryCars, new OrdinaryCarParkingStrategy(limitations));
    }
    parkCar(car) {
        const parkingStrategy = this.parkingStrategies.get(car.type);
        const parkingType = parkingStrategy.findParkingType(this.spaces);
        if (parkingType === undefined) {
            return null;
        }
        const ticket = {
            parkingLotId: this.id,
            parkingType: parkingType,
            parkingSpaceId: ''
        };
        const parkingSpaces = this.spaces.get(parkingType);
        if (parkingSpaces) {
            parkingSpaces.add(ticket);
        }
        else {
            this.spaces.set(parkingType, new Set([ticket]));
        }
        return ticket;
    }
    getAvailableSpaces(type) {
        return this.limitations.get(type) - this.spaces.get(type).size;
    }
    retrieveCar(ticket) {
        const typeSpaces = this.spaces.get(ticket.parkingType);
        return typeSpaces.delete(ticket);
    }
}
exports.default = ParkingLot;
//# sourceMappingURL=parkingLot.js.map