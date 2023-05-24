import { Module } from '@nestjs/common';
import { RoomModule } from './modules/room/room.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { BuildingModule } from './modules/building/building.module';

@Module({
  imports: [
    RoomModule,
    BuildingModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
