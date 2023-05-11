import { Injectable } from '@nestjs/common';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { UpdateRoomRequestDTO } from './dto/UpdateRoomRequestDTO.model';

@Injectable()
export class RoomService {
    updateRoom(roomId: string, udpatedRoom: UpdateRoomRequestDTO) {
        return udpatedRoom;
    }
    getRoomsById(id: string) {
        return id;
    }
    createNewRoom(room: CreateRoomRequestDTO) {
        return room;
    }
    getAllRooms() {
        throw new Error('Method not implemented.');
    }
}
