import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'crypto';

export type BuildingDocument = Building & Document;

@Schema()
export class Building {
  @Prop()
  id: UUID;

  @Prop()
  building_num: number;

  @Prop()
  name: string;

  @Prop()
  campus: string;
}

export const BuildingSchema = SchemaFactory.createForClass(Building);
