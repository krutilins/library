import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { IGraphQLCtx } from './interfaces/ctx.context';
import { LoadersService } from '../loaders/loaders.service';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly loadersService: LoadersService,
  ) {}

  public createGqlOptions(): ApolloDriverConfig {
    const environment = this.configService.get<string>('environment');

    const customContext: IGraphQLCtx = {
      loaders: this.loadersService.getLoaders(),
    };

    return {
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: environment === 'development',
      context: (context) => {
        return {
          ...context,
          ...customContext,
        };
      },
    };
  }
}
