import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Building,
  BuildingDocument,
} from 'src/database/schemas/Building.schema';
import { CreateBuildingRequestDTO } from './dto/CreateBuildingRequestDTO.model';
import { UpdateBuildingRequestDTO } from './dto/UpdateBuildingRequestDTO.model';
import { v4 as uuidv4 } from 'uuid';
import NotFoundException from 'src/exceptions/exception/NotFoundException';

@Injectable()
export class BuildingService {
  constructor(
    @InjectModel(Building.name)
    private readonly buildingModel: Model<BuildingDocument>,
  ) {}

  async createNewBuilding(
    building: CreateBuildingRequestDTO,
  ): Promise<BuildingDocument> {
    const newBuilding = new this.buildingModel({
      _id: uuidv4(),
      building_num: building.building_num,
      name: building.name,
      campus: building.campus,
    });
    return newBuilding.save();
  }

  async getAllBuilding() {
    try {
      return this.buildingModel.find().exec();
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getBuildingById(id: string): Promise<BuildingDocument> {
    try {
      const building = await this.buildingModel.findById(id).exec();
      return building;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async updateBuilding(
    buildingId: string,
    updatedBuilding: UpdateBuildingRequestDTO,
  ) {
    try {
      const updated = await this.buildingModel.findOneAndUpdate(
        { buildingId },
        updatedBuilding,
        { new: true },
      );
      return updated;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async deleteBuilding(buildingId: string) {
    try {
      const building = await this.buildingModel
        .deleteOne({ _id: buildingId })
        .exec();
      return building;
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
