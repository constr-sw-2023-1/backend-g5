import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Resource } from './Resource.schema';
import { Room as IRoom } from '../../modules/room/models/Room.model';

export type RoomDocument = Room & Document;

@Schema()
export class Room implements IRoom {
  @Prop()
  id: string;

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
