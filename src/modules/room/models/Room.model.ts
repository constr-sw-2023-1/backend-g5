import { Resource } from './Resource.model';

export interface Room {
  id: string;
  name: string;
  capacity: number;
  floor: number;
  resources: Resource[];
  building_id: string;
}
