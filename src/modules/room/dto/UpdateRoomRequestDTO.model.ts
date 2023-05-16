import { Resource } from '../models/Resource.model';

export class UpdateRoomRequestDTO {
  name: string;
  capacity: number;
  floor: number;
  resources: Resource[];
  building: string;
}
