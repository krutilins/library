import { AuthorService } from './author.service';
import { createBaseLoader } from 'src/base/base.loader';

export function createAuthorsLoader(authorService: AuthorService) {
  return createBaseLoader(authorService);
}
