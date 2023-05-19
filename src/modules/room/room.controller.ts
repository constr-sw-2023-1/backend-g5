import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { RoomService } from './room.service';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateRoomRequestDTO } from './dto/UpdateRoomRequestDTO.model';
import { UpdateRoomResourceRequestDTO } from './dto/UpdateRoomResourceRequestDTO.model';
import { Unprotected } from 'nest-keycloak-connect';

@ApiTags('rooms')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Get()
  @Unprotected()
  @HttpCode(HttpStatus.OK)
  async getAllRooms() {
    return this.roomService.getAllRooms();
  }

  @ApiBody({ type: CreateRoomRequestDTO })
  @Post()
  @Unprotected()
  @HttpCode(HttpStatus.CREATED)
  async createNewRoom(@Body() room: CreateRoomRequestDTO) {
    return this.roomService.createNewRoom(room);
  }


  @ApiParam({
    name: 'id',
    description: 'Room ID',
    type: 'string',
    required: true,
    example: '123',
  })
  @Get(':id')
  @Unprotected()
  @HttpCode(HttpStatus.OK)
  async getRoomById(@Param('id') roomId: string) {
    return this.roomService.getRoomById(roomId);
  }

  @ApiParam({
    name: 'id',
    description: 'Room ID',
    type: 'string',
    required: true,
    example: '123456',
  })
  @ApiBody({ type: UpdateRoomRequestDTO })
  @Put(':id')
  @Unprotected()
  @HttpCode(HttpStatus.OK)
  async updateRoom(
    @Param('id') roomId: string,
    @Body() udpatedRoom: UpdateRoomRequestDTO,
  ) {
    return this.roomService.updateRoom(roomId, udpatedRoom);
  }


  @ApiParam({
    name: 'id',
    description: 'Room ID',
    type: 'string',
    required: true,
    example: '123',
  })
  @ApiBody({ type: UpdateRoomResourceRequestDTO })
  @Patch(':id')
  @Unprotected()
  @HttpCode(HttpStatus.OK)
  async patchRoomResource(
    @Param('id') roomId: string,
    @Body() newResources: UpdateRoomResourceRequestDTO,
  ) {
    return this.roomService.updateRoomResource(roomId, newResources);
  }

  @ApiParam({
    name: 'id',
    description: 'Room ID',
    type: 'string',
    required: true,
    example: '123',
  })
  @Delete(':id')
  @Unprotected()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRoom(@Param('id') roomId: string) {
    return this.roomService.deleteRoom(roomId);
  }
}
