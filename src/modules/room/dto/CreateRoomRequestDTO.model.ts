import { Resource } from '../models/Resource.model';

export class CreateRoomRequestDTO {
  name: string;
  capacity: number;
  floor: number;
  resources: Resource[];
  building: string;
}
