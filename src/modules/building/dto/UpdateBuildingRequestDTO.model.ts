import { ApiProperty } from '@nestjs/swagger';
import { Building } from '../models/Building.model';
import { IsNotEmpty } from 'class-validator';

export class UpdateBuildingRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  Building: Building[];
}
