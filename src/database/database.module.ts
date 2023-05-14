import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://database/nest')],
  controllers: [],
})
export class DatabaseModule {}
