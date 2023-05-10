import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { RoomService } from './room.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateRoomRequestDTO } from './dto/UpdateRoomRequestDTO.model';

@ApiTags('rooms')
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

    @Put(':id')
    async updateRoom(@Param('id') roomId: string, @Body() room : UpdateRoomRequestDTO){

    }
}
