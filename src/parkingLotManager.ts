import ParkingLot from './parkingLot';
import { ParkingType } from './types';

class ParkingLotManager {
    private parkingLots: ParkingLot[] = new Array<ParkingLot>();
    
    createParkingLot(parkingLotId: string, config: Map<ParkingType, number>): void {
        const parkingLot: ParkingLot = new ParkingLot(parkingLotId, config);
        this.parkingLots.push(parkingLot);
    }

    editParkingLot(parkingLotId: string, limitations: Map<ParkingType, number>): void {
        const parkingLot = this.findParkingLot(parkingLotId);
        if (!parkingLot || parkingLot.isInUse()) {
            return;
        }

        parkingLot.update(limitations);
    }

    deleteParkingLot(parkingLotId: string): void {
        const parkingLot = this.findParkingLot(parkingLotId);
        if (!parkingLot || parkingLot.isInUse()) {
            return;
        }

        const index = this.parkingLots.findIndex((lot) => lot.id === parkingLotId);

        this.parkingLots.splice(index, 1);
    }

    getParkingLots(): ParkingLot[] {
        return this.parkingLots;
    }

    getAvailableSpaces(parkingLotId: string, parkingType: ParkingType): number {
        const parkingLot = this.findParkingLot(parkingLotId);

        return parkingLot.getAvailableSpaces(parkingType);
    }

    findParkingLot(parkingLotId: string): ParkingLot | undefined {
        return this.parkingLots.find((lot) => lot.id === parkingLotId);
    }
}

export default ParkingLotManager;