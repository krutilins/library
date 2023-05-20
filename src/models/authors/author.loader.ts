import * as DataLoader from 'dataloader';

import { createBaseLoader } from 'src/base';

import { AuthorService } from './author.service';
import { Author } from './entity';

export function createAuthorsLoader(
  authorService: AuthorService,
): DataLoader<number, Author, number> {
  return createBaseLoader<Author>(authorService);
}
