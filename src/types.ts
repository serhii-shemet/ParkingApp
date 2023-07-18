export enum ParkingType {
    Trucks = 'trucks',
    ElectricCars = 'electricCars',
    OrdinaryCars = 'ordinaryCars',
};

export interface Car {
    id: string;
    type: ParkingType;
}

export interface ParkingTicket {
    parkingLotId: string;
    parkingType: ParkingType;
    carId: string;
}