import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    async getAllRooms() {
        return this.roomService.getAllRooms();
    }

    @Post()
    async createNewRoom(@Body() room: CreateRoomRequestDTO) {
        return this.roomService.createNewRoom(room);
    }
}
