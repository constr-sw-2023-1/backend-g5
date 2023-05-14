import { Building } from '../models/Building.model';
import { Room } from '../models/Room.model';

export class CreateRoomRequestDTO {
  room: Room;
  building: Building;
}
