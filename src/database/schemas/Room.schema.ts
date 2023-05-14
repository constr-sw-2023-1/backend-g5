import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Resource } from './Resource.schema';
import { UUID } from 'crypto';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop()
  id: UUID;

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
