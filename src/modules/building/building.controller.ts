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
import { Unprotected } from 'nest-keycloak-connect';
import { BuildingService } from './building.service';
import { CreateBuildingRequestDTO } from './dto/CreateBuildingRequestDTO.model';
import { UpdateBuildingRequestDTO } from './dto/UpdateBuildingRequestDTO.model';

@ApiTags('buildings')
@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) { }

  @Get()
  @Unprotected()
  async getAllBuildings() {
    return this.buildingService.getAllBuilding();
  }

  @Post()
  @Unprotected()
  async createNewBuilding(@Body() building: CreateBuildingRequestDTO) {
    return this.buildingService.createNewBuilding(building);
  }

  @Get(':id')
  async getBuildingById(@Param('id') buildingId: string) {
    return this.buildingService.getBuildingById(buildingId);
  }

  @Put(':id')
  async updateBuilding(
    @Param('id') buildingId: string,
    @Body() udpatedBuilding: UpdateBuildingRequestDTO,
  ) {
    return this.buildingService.updateBuilding(buildingId, udpatedBuilding);
  }

  @Delete(':id')
  async deleteBuilding(@Param('id') buildingId: string) {
    return this.buildingService.disableBuilding(buildingId);
  }
}
