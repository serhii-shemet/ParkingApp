"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parkingLot_1 = require("./parkingLot");
class ParkingLotManager {
    constructor() {
        this.parkingLots = new Array();
    }
    createParkingLot(parkingLotId, config) {
        const parkingLot = new parkingLot_1.default(parkingLotId, config);
        this.parkingLots.push(parkingLot);
    }
    editParkingLot(parkingLotId, limitations) {
        const parkingLot = this.findParkingLot(parkingLotId);
        if (!parkingLot || parkingLot.isInUse()) {
            return;
        }
        parkingLot.update(limitations);
    }
    deleteParkingLot(parkingLotId) {
        const parkingLot = this.findParkingLot(parkingLotId);
        if (!parkingLot || parkingLot.isInUse()) {
            return;
        }
        const index = this.parkingLots.findIndex((lot) => lot.id === parkingLotId);
        this.parkingLots.splice(index, 1);
    }
    getParkingLots() {
        return this.parkingLots;
    }
    getAvailableSpaces(parkingLotId, parkingType) {
        const parkingLot = this.findParkingLot(parkingLotId);
        return parkingLot.getAvailableSpaces(parkingType);
    }
    findParkingLot(parkingLotId) {
        return this.parkingLots.find((lot) => lot.id === parkingLotId);
    }
}
exports.default = ParkingLotManager;
//# sourceMappingURL=parkingLotManager.js.map