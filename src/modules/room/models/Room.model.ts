import { Types } from 'mongoose';
import { Building } from 'src/modules/building/models/Building.model';
import { Resource } from './Resource.model';

export interface Room {
  _id: Types.ObjectId;
  active: boolean;
  name: string;
  capacity: number;
  floor: number;
  resources: Resource[];
  building: Types.ObjectId | Building;
}
