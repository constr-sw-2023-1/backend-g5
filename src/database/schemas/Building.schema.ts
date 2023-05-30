import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Building as IBuilding } from '../../modules/building/models/Building.model';
import { BooleanExpression, Types } from 'mongoose';


export type BuildingDocument = Building & Document;

@Schema({ strict: false })
export class Building implements IBuilding {
  @Prop({
    type: Types.ObjectId,
    default: Types.ObjectId,
  })
  _id: Types.ObjectId;

  @Prop()
  active: boolean;

  @Prop()
  building_num: number;

  @Prop()
  name: string;

  @Prop()
  campus: string;
}

export const BuildingSchema = SchemaFactory.createForClass(Building);
