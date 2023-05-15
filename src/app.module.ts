import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const environment = configService.get<string>('environment');
        const databaseHost = configService.get<string>('database.host');
        const databasePort = configService.get<number>('database.port');
        const databaseUsername = configService.get<string>('database.username');
        const databasePassword = configService.get<string>('database.password');
        const databaseName = configService.get<string>('database.name');

        return {
          type: 'mysql',
          host: databaseHost,
          port: databasePort,
          username: databaseUsername,
          password: databasePassword,
          database: databaseName,
          entities: [],
          synchronize: environment === 'development' ? true : false,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
