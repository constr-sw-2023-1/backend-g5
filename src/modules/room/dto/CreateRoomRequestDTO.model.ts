import { ApiProperty } from '@nestjs/swagger';
import { Resource } from '../models/Resource.model';
import { IsNotEmpty } from 'class-validator';

export class CreateRoomRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty()
  @IsNotEmpty()
  floor: number;

  @ApiProperty()
  @IsNotEmpty()
  resources: Resource[];

  @ApiProperty()
  @IsNotEmpty()
  building: string;
}

