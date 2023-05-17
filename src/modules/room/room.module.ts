import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'src/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/database/schemas/Room.schema';
import { Resource, ResourceSchema } from 'src/database/schemas/Resource.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Resource.name, schema: ResourceSchema },
    ]),
    HttpModule,
  ],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
