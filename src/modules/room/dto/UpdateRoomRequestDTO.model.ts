import { Room } from "../models/Room.model";
import { Building } from "../models/Building.model";

export class UpdateRoomRequestDTO {
    room: Room;
    building: Building;
}