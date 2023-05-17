import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from './graphql-config.service';
import { AuthorModule } from 'src/authors/author.module';
import { BookModule } from 'src/books/book.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
      imports: [AuthorModule, BookModule],
    }),
  ],
})
export class CustomGraphQLModule {}
