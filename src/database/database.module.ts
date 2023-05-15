import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://root:root@database/writeapp?authSource=admin')],
  controllers: [],
})
export class DatabaseModule { }
