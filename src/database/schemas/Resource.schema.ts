import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Resource as IResource } from '../../modules/room/models/Resource.model';

export type ResourceDocument = Resource & Document;

@Schema()
export class Resource implements IResource {
  @Prop()
  name: string;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
