import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Building, BuildingDocument } from 'src/database/schemas/Building.schema';
import { CreateBuildingRequestDTO } from './dto/CreateBuildingRequestDTO.model';
import { UpdateBuildingRequestDTO } from './dto/UpdateBuildingRequestDTO.model';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class BuildingService {
  constructor(
    @InjectModel(Building.name)
    private readonly buildingModel: Model<BuildingDocument>,
  ) { }

  async createNewBuilding(building: CreateBuildingRequestDTO): Promise<BuildingDocument> {
    const newBuilding = new this.buildingModel({
      _id: uuidv4(),
      building_num: building.building_num,
      name: building.name,
      campus: building.campus,
    });
    return newBuilding.save();
  }

  async getAllBuilding() {
    return this.buildingModel.find().exec();
  }

  getBuildingById(id: string) {
    //ToDo
    return id;
  }

  updateBuilding(buildingId: string, udpatedBuilding: UpdateBuildingRequestDTO) {
    //ToDo
    return udpatedBuilding;
  }

  disableBuilding(buildingId: string) {
    //ToDo
    return buildingId;
  }
}
