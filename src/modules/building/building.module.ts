import { Module } from '@nestjs/common';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Building, BuildingSchema } from 'src/database/schemas/Building.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Building.name, schema: BuildingSchema },
    ]),
    HttpModule,
  ],
  providers: [BuildingService],
  controllers: [BuildingController],
})
export class BuildingModule { }
