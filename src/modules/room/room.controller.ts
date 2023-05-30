import {
  BadRequestException,
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
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { RoomService } from './room.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags
} from '@nestjs/swagger';
import { UpdateRoomRequestDTO } from './dto/UpdateRoomRequestDTO.model';
import { UpdateRoomResourceRequestDTO } from './dto/UpdateRoomResourceRequestDTO.model';
import { Room } from 'src/database/schemas/Room.schema';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';

@ApiBearerAuth('Authorization')
@ApiTags('rooms')
@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllRooms() {
    return this.roomService.getAllRooms();
  }

  @Get('greater-capacity')
  @ApiQuery({ name: 'capacity', type: 'number', required: true })
  @HttpCode(HttpStatus.OK)
  async findRoomsBySimpleQuery(
    @Query('capacity') capacity: string,
  ): Promise<Room[]> {
    const parsedCapacity = Number(capacity);

    if (isNaN(parsedCapacity)) {
      throw new BadRequestException('Invalid capacity value');
    }

    return this.roomService.findAllRoomsWithCapacity(parsedCapacity);
  }

  @Get('query')
  @ApiQuery({ name: 'name', type: 'string', required: false, example: '{like}sala' })
  @ApiQuery({ name: 'floor', type: 'string', required: false, example: '{equals}4' })
  @ApiQuery({ name: 'active', type: 'string', required: false, example: '{equals}true' })
  @ApiQuery({ name: 'capacity', type: 'string', required: false,
    description: 'equals / neq / gt / gteq / lt / lteq / like',
    example: '{gt}20'})
  @HttpCode(HttpStatus.OK)
  async findRoomsByParams(@Query('capacity') capacity?: string, @Query('floor') floor?: string, @Query('name') name?: string, @Query('active') active?: string): Promise<Room[]> {
    const params: any = {};
    if (name) params.name = name;
    if (floor) params.floor = floor;
    if (capacity) params.capacity = capacity;
    if (active) params.active = active;
    
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
