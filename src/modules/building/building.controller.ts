import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
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
  async getAllBuildings() {
    return this.buildingService.getAllBuilding();
  }

  @Post()
  async createNewBuilding(@Body() building: CreateBuildingRequestDTO) {
    return this.buildingService.createNewBuilding(building);
  }

  @Get(':id')
  async getBuildingById(@Param('id') buildingId: UUID) {
    return this.buildingService.getBuildingById(buildingId);
  }

  @Put(':id')
  async updateBuilding(
    @Param('id') buildingId: UUID,
    @Body() udpatedBuilding: UpdateBuildingRequestDTO,
  ) {
    return this.buildingService.updateBuilding(buildingId, udpatedBuilding);
  }

  @Delete(':id')
  async deleteBuilding(@Param('id') buildingId: UUID) {
    return this.buildingService.disableBuilding(buildingId);
  }
}
