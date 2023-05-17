import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Building, BuildingDocument } from 'src/database/schemas/Building.schema';
import { CreateBuildingRequestDTO } from './dto/CreateBuildingRequestDTO.model';
import { UpdateBuildingRequestDTO } from './dto/UpdateBuildingRequestDTO.model';

@Injectable()
export class BuildingService {
  constructor(
    @InjectModel(Building.name)
    private readonly buildingModel: Model<BuildingDocument>,
  ) {}

  async createNewBuilding(building: CreateBuildingRequestDTO): Promise<BuildingDocument> {
    return this.buildingModel.create(building);
  }

  getAllBuilding() {
    return 'working';
  }

  getBuildingById(id: UUID) {
    //ToDo
    return id;
  }
  
  updateBuilding(buildingId: string, udpatedBuilding: UpdateBuildingRequestDTO) {
    //ToDo
    return udpatedBuilding;
  }

  disableBuilding(buildingId: UUID) {
    //ToDo
    return buildingId;
  }
}
