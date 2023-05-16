import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Building as IBuilding } from '../../modules/room/models/Building.model';

export type BuildingDocument = Building & Document;

@Schema()
export class Building implements IBuilding {
  @Prop()
  id: string;

  @Prop()
  building_num: number;

  @Prop()
  name: string;

  @Prop()
  campus: string;
}

export const BuildingSchema = SchemaFactory.createForClass(Building);
