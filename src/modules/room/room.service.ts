import { HttpException, HttpStatus, Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room, RoomDocument } from 'src/database/schemas/Room.schema';
import { CreateRoomRequestDTO } from './dto/CreateRoomRequestDTO.model';
import { UpdateRoomRequestDTO } from './dto/UpdateRoomRequestDTO.model';
import { UpdateRoomResourceRequestDTO } from './dto/UpdateRoomResourceRequestDTO.model';
import { v4 as uuidv4 } from 'uuid';
import NotFoundException from 'src/exceptions/exception/NotFoundException';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name)
    private readonly roomModel: Model<RoomDocument>,
  ) {}

  async getAllRooms() {
    try {
      return this.roomModel.find().populate('building', 'building_num').exec();
    } catch (error) {
      throw new NotFoundException();
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
      throw new NotFoundException();
    }

    return populatedRoom;
  }

  async getRoomById(id: string): Promise<RoomDocument> {
    try {
      const room = await this.roomModel
        .findById(id)
        .populate('building', 'building_num')
        .exec();
      return room;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async updateRoomResource(
    roomId: string,
    newResources: UpdateRoomResourceRequestDTO,
  ): Promise<RoomDocument> {
    try {
      const filter = { _id: roomId };
      const update = {
        resources: newResources,
      };

      const room = await this.roomModel
        .findOneAndUpdate(filter, update, { new: true })
        .populate('building', 'building_num')
        .exec();

      return room;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async updateRoom(
    roomId: string,
    udpatedRoom: UpdateRoomRequestDTO,
  ): Promise<RoomDocument> {
    try {
      const filter = { _id: roomId };
      const update = {
        name: udpatedRoom.name,
        capacity: udpatedRoom.capacity,
        floor: udpatedRoom.floor,
        resources: udpatedRoom.resources,
        building: udpatedRoom.building,
      };

      const room = await this.roomModel
        .findOneAndUpdate(filter, update, { new: true })
        .populate('building', 'building_num')
        .exec();

      return room;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteRoom(roomId: string) {
    try {
      const room = await this.roomModel
        .deleteOne({ _id: roomId })
        .populate('building', 'building_num')
        .exec();
      return room;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findRoomsByParams(@Query() params: any): Promise<Room[]> {
    try {
      const conditions = {};

      for (const param in params) {
        if (params.hasOwnProperty(param)) {
          const [operator, value] = params[param].split('}');
          const field = param.replace('{', '');
          const newOperator = operator.replace('{', '');

          switch (newOperator) {
            case 'equals':
              conditions[field] = value;
              break;
            case 'neq':
              conditions[field] = { $ne: value };
              break;
            case 'gt':
              conditions[field] = { $gt: Number(value) };
              break;
            case 'gteq':
              conditions[field] = { $gte: Number(value) };
              break;
            case 'lt':
              conditions[field] = { $lt: Number(value) };
              break;
            case 'lteq':
              conditions[field] = { $lte: Number(value) };
              break;
            case 'like':
              const regex = new RegExp(value, 'i');
              conditions[field] = { $regex: regex };
              break;
            case 'building':
              const buildingId = new Types.ObjectId(value);
              conditions['building'] = buildingId;
              break;
            default:
              break;
          }
        }
      }

      const query = this.roomModel.find(conditions);
      return query.exec();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findAllRoomsWithCapacity(capacity: number) {
    try {
      return this.roomModel.find({ capacity: { $gt: Number(capacity) } });
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
