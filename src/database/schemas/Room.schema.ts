import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Resource } from './Resource.schema';
import { Room as IRoom } from '../../modules/room/models/Room.model';
import { v4 as uuidv4 } from 'uuid';


export type RoomDocument = Room & Document;

@Schema()
export class Room implements IRoom {
  @Prop({
    type: String, default: function genUUID() {
      return uuidv4()
    }
  })
  id: string

  @Prop()
  name: string;

  @Prop()
  capacity: number;

  @Prop()
  floor: number;

  @Prop()
  resources: Resource[];

  @Prop()
  building_id: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
