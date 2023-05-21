import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Unprotected } from 'nest-keycloak-connect';
import { BuildingService } from './building.service';
import { CreateBuildingRequestDTO } from './dto/CreateBuildingRequestDTO.model';
import { UpdateBuildingRequestDTO } from './dto/UpdateBuildingRequestDTO.model';

@ApiTags('buildings')
@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Get()
  @Unprotected()
  @HttpCode(HttpStatus.OK)
  async getAllBuildings() {
    return this.buildingService.getAllBuilding();
  }

  @ApiBody({ type: CreateBuildingRequestDTO })
  @Post()
  @Unprotected()
  @HttpCode(HttpStatus.CREATED)
  async createNewBuilding(@Body() building: CreateBuildingRequestDTO) {
    return this.buildingService.createNewBuilding(building);
  }

  @ApiParam({
    name: 'id',
    description: 'Building ID',
    type: 'string',
    required: true,
    example: '123',
  })
  @Get(':id')
  @Unprotected()
  @HttpCode(HttpStatus.OK)
  async getBuildingById(@Param('id') buildingId: string) {
    return this.buildingService.getBuildingById(buildingId);
  }

  @ApiParam({
    name: 'id',
    description: 'Building ID',
    type: 'string',
    required: true,
    example: '123456',
  })
  @ApiBody({
    type: UpdateBuildingRequestDTO,
  })
  @Put(':id')
  @Unprotected()
  @HttpCode(HttpStatus.OK)
  async updateBuilding(
    @Param('id') buildingId: string,
    @Body() updatedBuilding: UpdateBuildingRequestDTO,
  ) {
    const updated = await this.buildingService.updateBuilding(
      buildingId,
      updatedBuilding,
    );
    return updated;
  }

  @ApiParam({
    name: 'id',
    description: 'Building ID',
    type: 'string',
    required: true,
    example: '123',
  })
  @Delete(':id')
  @Unprotected()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBuilding(@Param('id') buildingId: string) {
    return this.buildingService.deleteBuilding(buildingId);
  }
}
