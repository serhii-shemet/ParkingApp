"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parkingLot_1 = require("./parkingLot");
class ParkingLotManager {
    createParkingLot(parkingLotId, config) {
        const parkingLot = new parkingLot_1.default(parkingLotId, config);
        this.parkingLots.push(parkingLot);
    }
    editParkingLot(parkingLotId, limitations) {
        const parkingLot = this.findParkingLot(parkingLotId);
        if (!parkingLot) {
            return;
        }
        parkingLot.limitations = limitations;
    }
    deleteParkingLot(parkingLotId) {
        const index = this.parkingLots.findIndex((lot) => lot.id === parkingLotId);
        if (index !== -1) {
            this.parkingLots.splice(index, 1);
        }
    }
    getParkingLots() {
        return this.parkingLots;
    }
    findParkingLot(parkingLotId) {
        return this.parkingLots.find((lot) => lot.id === parkingLotId);
    }
}
//# sourceMappingURL=parkingLotManager.js.map