import { Building } from './Building.model';
import { Resource } from './Resource.model';

export interface Room {
  _id: string;
  name: string;
  capacity: number;
  floor: number;
  resources: Resource[];
  building: Building;
}
