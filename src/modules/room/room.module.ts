import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [HttpModule],
  providers: [RoomService],
  controllers: [RoomController]
})
export class RoomModule { }
