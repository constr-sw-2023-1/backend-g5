import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { BuildingService } from './building.service';
import { CreateBuildingRequestDTO } from './dto/CreateBuildingRequestDTO.model';
import { UpdateBuildingRequestDTO } from './dto/UpdateBuildingRequestDTO.model';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { AuthenticationExceptionFilter } from 'src/exceptions/filters/AuthenticationExceptionFilter';
import { AuthorizationExceptionFilter } from 'src/exceptions/filters/AuthorizationException';
import { NotFoundExceptionFilter } from 'src/exceptions/filters/NotFoundExceptionFilter';
import { ResourceAlreadyExistsExceptionFilter } from 'src/exceptions/filters/ResourceAlreadyExistsExceptionFilter';

@UseFilters(
  NotFoundExceptionFilter,
  AuthenticationExceptionFilter,
  AuthorizationExceptionFilter,
  ResourceAlreadyExistsExceptionFilter,
)
@ApiBearerAuth('Authorization')
@ApiTags('buildings')
@UseGuards(JwtAuthGuard)
@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBuildings() {
    return this.buildingService.getAllBuilding();
  }

  @ApiBody({ type: CreateBuildingRequestDTO })
  @Post()
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
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBuilding(@Param('id') buildingId: string) {
    return this.buildingService.deleteBuilding(buildingId);
  }
}
