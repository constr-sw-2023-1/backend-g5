import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import MongoException from 'src/exceptions/exception/MongoException';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://root:root@mongodb/writeapp?authSource=admin',
        connectionFactory: (connection) => {
          connection.on('error', (error) => {
            if (error.message.includes('getaddrinfo EAI_AGAIN')) {
              throw new MongoException();
            }
          });
          return connection;
        },
      }),
    }),
  ],
  controllers: [],
})
export class DatabaseModule { }
