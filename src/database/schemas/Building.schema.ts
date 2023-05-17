import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Building as IBuilding } from '../../modules/building/models/Building.model';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongoose';


export type BuildingDocument = Building & Document;

@Schema()
export class Building implements IBuilding {
  @Prop({
    type: String, default: function genUUID() {
      return uuidv4()
    }
  })
  _id: string

  @Prop()
  building_num: number;

  @Prop()
  name: string;

  @Prop()
  campus: string;
}

export const BuildingSchema = SchemaFactory.createForClass(Building);
