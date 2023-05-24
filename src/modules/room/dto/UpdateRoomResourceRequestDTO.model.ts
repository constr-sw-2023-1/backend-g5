import { ApiProperty } from '@nestjs/swagger';
import { Resource } from '../models/Resource.model';
import { IsNotEmpty } from 'class-validator';

export class UpdateRoomResourceRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  resources: Resource[];
}
