import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ResourceDocument = Resource & Document;

@Schema()
export class Resource {
  @Prop()
  name: string;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
