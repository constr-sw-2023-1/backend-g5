import { Module } from '@nestjs/common';
import { RoomModule } from './modules/room/room.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { BuildingModule } from './modules/building/building.module';
import { APP_FILTER } from '@nestjs/core';
import { NotFoundExceptionFilter } from './exceptions/filters/NotFoundExceptionFilter';
import { AuthenticationExceptionFilter } from './exceptions/filters/AuthenticationExceptionFilter';
import { AuthorizationExceptionFilter } from './exceptions/filters/AuthorizationException';
import { MongoExceptionFilter } from './exceptions/filters/MongoExceptionFilter';
import { ResourceAlreadyExistsExceptionFilter } from './exceptions/filters/ResourceAlreadyExistsExceptionFilter';

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
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AuthenticationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AuthorizationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: MongoExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ResourceAlreadyExistsExceptionFilter,
    },
  ],
})
export class AppModule {}
