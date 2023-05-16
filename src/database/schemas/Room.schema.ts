import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Resource } from './Resource.schema';
import { Room as IRoom } from '../../modules/room/models/Room.model';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { Building } from './Building.schema';


export type RoomDocument = Room & Document;

@Schema()
export class Room implements IRoom {
  @Prop({
    type: String, default: function genUUID() {
      return uuidv4()
    }
  })
  _id: string

  @Prop()
  name: string;

  @Prop()
  capacity: number;

  @Prop()
  floor: number;

  @Prop()
  resources: Resource[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Building' })
  building: Building;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
