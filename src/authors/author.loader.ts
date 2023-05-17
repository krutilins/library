import * as DataLoader from 'dataloader';

import { AuthorService } from './author.service';
import { Author } from './entity';
import { mapFromArray } from 'src/utils/mapFromArray';

export function createAuthorsLoader(authorService: AuthorService) {
  return new DataLoader<number, Author>(async (ids) => {
    const users = await authorService.findByIds(ids);

    const usersMap = mapFromArray(users, 'id');

    return ids.map((id) => usersMap.get(id));
  });
}
