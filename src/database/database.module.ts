import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import MongoException from 'src/exceptions/exception/MongoException';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('MONGODB_USERNAME')}:${configService.get('MONGODB_PASSWORD')}@mongodb`,
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
