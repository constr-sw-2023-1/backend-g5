import { Injectable } from '@nestjs/common';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { UpdateRoomRequestDTO } from './dto/UpdateRoomRequestDTO.model';
import { UpdateRoomResourceRequestDTO } from './dto/UpdateRoomResourceRequestDTO.model';

@Injectable()
export class RoomService {
    disableRoom(roomId: string) {
        //ToDo
        return roomId;
    }
    updateRoomResource(roomId: string, newResources: UpdateRoomResourceRequestDTO) {
        //ToDo
        return newResources;
    }
    updateRoom(roomId: string, udpatedRoom: UpdateRoomRequestDTO) {
        //ToDo
        return udpatedRoom;
    }
    getRoomsById(id: string) {
        //ToDo
        return id;
    }
    createNewRoom(room: CreateRoomRequestDTO) {
        //ToDo
        return room;
    }
    getAllRooms() {
        //ToDo
        throw new Error('Method not implemented.');
    }
}
