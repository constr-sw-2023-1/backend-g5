import { Injectable } from '@nestjs/common';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { UpdateRoomRequestDTO } from './dto/UpdateRoomRequestDTO.model';
import { UpdateRoomResourceRequestDTO } from './dto/UpdateRoomResourceRequestDTO.model';
import { Room, RoomDocument } from 'src/database/schemas/Room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name)
    private readonly roomModel: Model<RoomDocument>,
  ) { }

  async getAllRooms() {
    return this.roomModel.find().exec();
  }

  async createNewRoom(room: CreateRoomRequestDTO): Promise<RoomDocument> {
    return this.roomModel.create(room);
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

  disableRoom(roomId: string) {
    //ToDo
    return roomId;
  }
}
