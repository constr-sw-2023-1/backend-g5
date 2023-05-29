import { Module, UseFilters } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoExceptionFilter } from 'src/exceptions/filters/MongoExceptionFilter';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:root@database/writeapp?authSource=admin',
    ),
  ],
  controllers: [],
})
@UseFilters(MongoExceptionFilter)
export class DatabaseModule {}
