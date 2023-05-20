import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { IGraphQLCtx } from './interfaces/ctx.context';
import { LoadersService } from '../loaders/loaders.service';
import { AppConfigService } from 'src/config/app/config.service';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly loadersService: LoadersService,
  ) {}

  public createGqlOptions(): ApolloDriverConfig {
    const environment = this.appConfigService.env;
    const isProduction = environment === 'production';

    const customContext: IGraphQLCtx = {
      loaders: this.loadersService.getLoaders(),
    };

    return {
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: !isProduction,
      context: (context) => {
        return {
          ...context,
          ...customContext,
        };
      },
    };
  }
}
