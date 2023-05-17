import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { AuthorService } from 'src/authors/author.service';
import { createAuthorsLoader } from 'src/authors/author.loader';
import { createBooksLoader } from 'src/books/book.loader';
import { BooksService } from 'src/books/book.service';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly authorsService: AuthorService,
    private readonly booksService: BooksService,
  ) {}

  public createGqlOptions(): ApolloDriverConfig {
    const environment = this.configService.get<string>('environment');

    return {
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: environment === 'development',
      context: (context) => {
        console.log('here');
        return {
          ...context,
          loaders: {
            authorsLoader: createAuthorsLoader(this.authorsService),
            booksLoader: createBooksLoader(this.booksService),
          },
        };
      },
    };
  }
}
