import { UUID } from 'crypto';
import { Resource } from './Resource.model';

export class Room {
  id: UUID;
  name: string;
  capacity: number;
  floor: number;
  resources: Resource[];
  building_id: string;
}
