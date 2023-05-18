import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Resource } from './Resource.schema';
import { Room as IRoom } from '../../modules/room/models/Room.model';
import { Building } from './Building.schema';
import { Types } from 'mongoose';


export type RoomDocument = Room & Document;

@Schema({ strict: false })
export class Room implements IRoom {
  @Prop({
    type: Types.ObjectId,
    default: Types.ObjectId,
  })
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  capacity: number;

  @Prop()
  floor: number;

  @Prop()
  resources: Resource[];

  @Prop({ type: Types.ObjectId, ref: 'Building' })
  building: Types.ObjectId | Building;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
