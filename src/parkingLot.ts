import { Car, ParkingType, ParkingTicket } from "./types";

function findAvailableType(
    spaces: Map<ParkingType, Set<ParkingTicket>>,
    maxSpaceCount: number,
    type: ParkingType): ParkingType | null {
    const availableSpaces = spaces.get(type) || new Set<ParkingTicket>();

    if (availableSpaces.size < maxSpaceCount) {
        return type;
    }

    return null;
}

interface ParkingStrategy {
    findParkingType(spaces: Map<ParkingType, Set<ParkingTicket>>): ParkingType | null;
}

class ElectricCarParkingStrategy implements ParkingStrategy {
    private maxElectricSpaces: number
    private maxTruckSpaces: number;
    private maxOrdinarySpaces: number;

    constructor(limitations: Map<ParkingType, number>) {
        this.maxElectricSpaces = limitations.get(ParkingType.ElectricCars);
        this.maxOrdinarySpaces = limitations.get(ParkingType.OrdinaryCars);
        this.maxTruckSpaces = limitations.get(ParkingType.Trucks);
    }

    findParkingType(spaces: Map<ParkingType, Set<ParkingTicket>>): ParkingType | null {
        return findAvailableType(spaces, this.maxElectricSpaces, ParkingType.ElectricCars)
            || findAvailableType(spaces, this.maxOrdinarySpaces, ParkingType.OrdinaryCars)
            || findAvailableType(spaces, this.maxTruckSpaces, ParkingType.Trucks);
    }
}

class OrdinaryCarParkingStrategy implements ParkingStrategy {
    private maxOrdinarySpaces: number;
    private maxTruckSpaces: number;

    constructor(limitations: Map<ParkingType, number>) {
        this.maxOrdinarySpaces = limitations.get(ParkingType.OrdinaryCars);
        this.maxTruckSpaces = limitations.get(ParkingType.Trucks);
    }

    findParkingType(spaces: Map<ParkingType, Set<ParkingTicket>>): ParkingType | null {
        return findAvailableType(spaces, this.maxOrdinarySpaces, ParkingType.OrdinaryCars)
            || findAvailableType(spaces, this.maxTruckSpaces, ParkingType.Trucks);
    }
}

class TruckParkingStrategy implements ParkingStrategy {
    private maxTruckSpaces: number;

    constructor(limitations: Map<ParkingType, number>) {
        this.maxTruckSpaces = limitations.get(ParkingType.Trucks);
    }

    findParkingType(spaces: Map<ParkingType, Set<ParkingTicket>>): ParkingType | null {
        return findAvailableType(spaces, this.maxTruckSpaces, ParkingType.Trucks);
    }
}

class ParkingLot {
    id: string;

    private limitations: Map<ParkingType, number>;
    private spaces: Map<ParkingType, Set<ParkingTicket>>;
    private parkingStrategies: Map<ParkingType, ParkingStrategy>;

    constructor(id: string, limitations: Map<ParkingType, number>) {
        this.id = id;
        this.limitations = limitations;
        this.spaces = new Map<ParkingType, Set<ParkingTicket>>;
        this.parkingStrategies = new Map<ParkingType, ParkingStrategy>;
        this.initializeParkingStrategies(limitations);
    }

    private initializeParkingStrategies(limitations: Map<ParkingType, number>) {
        this.parkingStrategies.set(ParkingType.Trucks, new TruckParkingStrategy(limitations));
        this.parkingStrategies.set(ParkingType.ElectricCars, new ElectricCarParkingStrategy(limitations));
        this.parkingStrategies.set(ParkingType.OrdinaryCars, new OrdinaryCarParkingStrategy(limitations));
    }

    parkCar(car: Car): ParkingTicket | null {
        const parkingStrategy = this.parkingStrategies.get(car.type);
        const parkingType = parkingStrategy.findParkingType(this.spaces);

        if (parkingType === null) {
            return null;
        }

        const ticket = {
            parkingLotId: this.id,
            parkingType: parkingType,
            carId: car.id
        };

        const parkingSpaces = this.spaces.get(parkingType);
        if (parkingSpaces) {
            parkingSpaces.add(ticket);
        } else {
            this.spaces.set(parkingType, new Set([ticket]));
        }

        return ticket;
    }

    getAvailableSpaces(type: ParkingType): number {
        return this.limitations.get(type) - (this.spaces.get(type)?.size || 0);
    }

    retrieveCar(ticket: ParkingTicket): boolean {
        const typeSpaces = this.spaces.get(ticket.parkingType);

        return typeSpaces.delete(ticket);
    }

    update(limitations: Map<ParkingType, number>): void {
        this.limitations = new Map(limitations);
        this.initializeParkingStrategies(this.limitations);
    }

    isInUse(): boolean {
        return Array.from(this.spaces.values()).some((spaces) => spaces.size > 0);
    }
}

export default ParkingLot;