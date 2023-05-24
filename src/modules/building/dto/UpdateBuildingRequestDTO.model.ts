import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateBuildingRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  building_num: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  campus: string;
}
