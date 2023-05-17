import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/database/schemas/Room.schema';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { UpdateRoomRequestDTO } from './dto/UpdateRoomRequestDTO.model';
import { UpdateRoomResourceRequestDTO } from './dto/UpdateRoomResourceRequestDTO.model';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name)
    private readonly roomModel: Model<RoomDocument>,
  ) {}

  disableRoom(roomId: UUID) {
    //ToDo
    return roomId;
  }
  updateRoomResource(roomId: UUID, newResources: UpdateRoomResourceRequestDTO) {
    //ToDo
    return newResources;
  }
  updateRoom(roomId: string, udpatedRoom: UpdateRoomRequestDTO) {
    //ToDo
    return udpatedRoom;
  }
  getRoomsById(id: UUID) {
    //ToDo
    return id;
  }
  async createNewRoom(room: CreateRoomRequestDTO): Promise<RoomDocument> {
    return this.roomModel.create(room);
  }
  getAllRooms() {
    return this.roomModel.find().exec();
  }
}
