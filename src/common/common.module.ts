import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (configService: ConfigService) => {
        const environment = configService.get<string>('environment');
        return {
          playground: environment === 'development',
          autoSchemaFile: true,
        };
      },
      inject: [ConfigService],
    }),
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
          entities: [__dirname + '/../**/*.entity.{js,ts}'],
          synchronize: environment === 'development',
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class CommonModule {}
