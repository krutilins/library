import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from './graphql-config.service';
import { LoadersModule } from '../loaders/loaders.module';
import { AppConfigModule } from 'src/config/app/config.module';

@Module({
  imports: [
    NestGraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
      imports: [AppConfigModule, LoadersModule],
    }),
  ],
})
export class GraphQLModule {}
