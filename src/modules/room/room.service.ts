import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room, RoomDocument } from 'src/database/schemas/Room.schema';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { UpdateRoomRequestDTO } from './dto/UpdateRoomRequestDTO.model';
import { UpdateRoomResourceRequestDTO } from './dto/UpdateRoomResourceRequestDTO.model';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';


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
    const newRoom = new this.roomModel({
      _id: uuidv4(),
      name: room.name,
      capacity: room.capacity,
      floor: room.floor,
      resources: room.resources,
      building: room.building,
    });

    const savedRoom = await newRoom.save();

    const populatedRoom = await this.roomModel
      .findById(savedRoom._id)
      .populate('building', 'building_num')
      .exec();

    if (!populatedRoom.building) {
      throw new HttpException('Invalid Reference to Building', HttpStatus.BAD_REQUEST);
    }

    return populatedRoom;
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
    try {
      return this.roomModel.findById(id);
    } catch (error) {
      throw new Error("Domain error when finding room by ID.");
    }
  }

  disableRoom(roomId: string) {
    //ToDo
    return roomId;
  }
}
