import { Injectable } from '@nestjs/common';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';

@Injectable()
export class RoomService {
    createNewRoom(room: CreateRoomRequestDTO) {
        return room;
    }
    getAllRooms() {
        throw new Error('Method not implemented.');
    }
}
