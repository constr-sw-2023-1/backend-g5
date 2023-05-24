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
  Query,
  UseGuards,
  Roles,
} from '@nestjs/common';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { RoomService } from './room.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateRoomRequestDTO } from './dto/UpdateRoomRequestDTO.model';
import { UpdateRoomResourceRequestDTO } from './dto/UpdateRoomResourceRequestDTO.model';
import { Room } from 'src/database/schemas/Room.schema';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { RoleAuthGuard } from 'src/guards/RoleAuthGuard';

@ApiBearerAuth('Authorization')
@ApiTags('rooms')
@UseGuards(JwtAuthGuard, RoleAuthGuard)
@Roles('admin')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllRooms() {
    return this.roomService.getAllRooms();
  }

  @Get('simple-equery')
  @ApiQuery({ name: 'capacity', type: 'number', required: true })
  @HttpCode(HttpStatus.OK)
  async findRoomsBySimpleQuery(@Query() capacity: number): Promise<Room[]> {
    return this.roomService.findAllRoomsWithCapacity(capacity);
  }

  @Get('query')
  @ApiQuery({ name: 'query', type: 'string', required: false })
  @HttpCode(HttpStatus.OK)
  async findRoomsByParams(@Query() params: any): Promise<Room[]> {
    return this.roomService.findRoomsByParams(params);
  }

  @ApiBody({ type: CreateRoomRequestDTO })
  @Post()
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRoom(@Param('id') roomId: string) {
    return this.roomService.deleteRoom(roomId);
  }
}
