import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { RoomService } from './room.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateRoomRequestDTO } from './dto/UpdateRoomRequestDTO.model';
import { UpdateRoomResourceRequestDTO } from './dto/UpdateRoomResourceRequestDTO.model';

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
    async updateRoom(@Param('id') roomId: string, @Body() udpatedRoom : UpdateRoomRequestDTO){
        return this.roomService.updateRoom(roomId, udpatedRoom);
    }

    @Patch(':id')
    async patchRoomResource(@Param('id') roomId: string, @Body() newResources: UpdateRoomResourceRequestDTO) {
        return this.roomService.updateRoomResource(roomId, newResources);
    }

    @Delete(':id')
    async deleteRoom(@Param('id') roomId: string) {
        return this.roomService.disableRoom(roomId);
    }
}
