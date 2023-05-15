import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthorModule } from './authors/author.module';
import { BookModule } from './books/book.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

const apiModules = [AuthorModule, BookModule];

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
          entities: [__dirname + '/**/*.entity.{js,ts}'],
          synchronize: environment === 'development',
        };
      },
      inject: [ConfigService],
    }),
    ...apiModules,
  ],
  providers: [AppService],
})
export class AppModule {}
