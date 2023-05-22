import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/database/schemas/Room.schema';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { UpdateRoomRequestDTO } from './dto/UpdateRoomRequestDTO.model';
import { UpdateRoomResourceRequestDTO } from './dto/UpdateRoomResourceRequestDTO.model';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name)
    private readonly roomModel: Model<RoomDocument>,
  ) { }

  async getAllRooms() {
    try {
      return this.roomModel
        .find()
        .populate('building', 'building_num')
        .exec();
    } catch (error) {
      throw new HttpException('Error when fetching rooms', HttpStatus.BAD_REQUEST);
    }
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

  async getRoomById(id: string): Promise<RoomDocument> {
    try {
      const user = await this.roomModel
        .findById(id)
        .populate('building', 'building_num')
        .exec();
      return user;
    } catch (error) {
      throw new HttpException('Error when fetching room by ID', HttpStatus.BAD_REQUEST);
    }
  }


  async updateRoomResource(roomId: string, newResources: UpdateRoomResourceRequestDTO): Promise<RoomDocument> {
    try {
      const filter = {'_id': roomId};
      const update = { 
        resources: newResources
      };

      const msg = await this.roomModel
        .findOneAndUpdate(filter, update, {new: true})
        .populate('building', 'building_num')
        .exec();

      return msg;
    } catch (error) {
      throw new HttpException('Error when fetching room by ID', HttpStatus.BAD_REQUEST);
    }
  }

  async updateRoom(roomId: string, udpatedRoom: UpdateRoomRequestDTO): Promise<RoomDocument> {
    try {
      const filter = {'_id': roomId};
      const update = { 
        name: udpatedRoom.name,
        capacity: udpatedRoom.capacity,
        floor: udpatedRoom.floor,
        resources: udpatedRoom.resources,
        building: udpatedRoom.building
      };

      const msg = await this.roomModel
        .findOneAndUpdate(filter, update, {new: true})
        .populate('building', 'building_num')
        .exec();

      return msg;
    } catch (error) {
      throw new HttpException('Error when fetching room by ID', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteRoom(roomId: string) {
    try {
      const msg = await this.roomModel
        .deleteOne({_id:roomId})
        .populate('building', 'building_num')
        .exec();
      return msg;
    } catch (error) {
      throw new HttpException('Error when fetching room by ID', HttpStatus.BAD_REQUEST);
    }
  }
}
