import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { RoomService } from './room.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateRoomRequestDTO } from './dto/UpdateRoomRequestDTO.model';
import { UpdateRoomResourceRequestDTO } from './dto/UpdateRoomResourceRequestDTO.model';
import { UUID } from 'crypto';
import { Unprotected } from 'nest-keycloak-connect';

@ApiTags('rooms')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @Unprotected()
  async getAllRooms() {
    return this.roomService.getAllRooms();
  }

  @Post()
  async createNewRoom(@Body() room: CreateRoomRequestDTO) {
    return this.roomService.createNewRoom(room);
  }

  @Get(':id')
  async getRoomById(@Param('id') roomId: UUID) {
    return this.roomService.getRoomsById(roomId);
  }

  @Put(':id')
  async updateRoom(
    @Param('id') roomId: UUID,
    @Body() udpatedRoom: UpdateRoomRequestDTO,
  ) {
    return this.roomService.updateRoom(roomId, udpatedRoom);
  }

  @Patch(':id')
  async patchRoomResource(
    @Param('id') roomId: UUID,
    @Body() newResources: UpdateRoomResourceRequestDTO,
  ) {
    return this.roomService.updateRoomResource(roomId, newResources);
  }

  @Delete(':id')
  async deleteRoom(@Param('id') roomId: UUID) {
    return this.roomService.disableRoom(roomId);
  }
}
