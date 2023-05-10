import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Get(":id")
    async getRoomById(@Param('id') roomId: string ){
        return this.roomService.getRoomsById(roomId);
    }
}
