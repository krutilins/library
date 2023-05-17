import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from './author.service';

import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookModule } from 'src/books/book.module';
import { Author } from './entity';

// import { Book } from 'src/books/book.entity';

const testAuthorName = 'Test Author 1';

const oneAuthor = {
  id: 1,
  name: 'author name 1',
};

const multipleAuthors = [
  {
    id: 2,
    name: 'author name 2',
  },
  {
    id: 3,
    name: 'author name 3',
  },
];

describe('AuthorService', () => {
  let authorService: AuthorService;
  let authorRepository: Repository<Author>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BookModule],
      providers: [
        AuthorService,
        {
          provide: getRepositoryToken(Author),
          useValue: {
            find: jest.fn().mockResolvedValue(multipleAuthors),
            findById: jest.fn().mockResolvedValue(oneAuthor),
            create: jest.fn().mockResolvedValue(oneAuthor),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    authorService = module.get<AuthorService>(AuthorService);
    authorRepository = module.get<Repository<Author>>(
      getRepositoryToken(Author),
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('it should be defined', () => {
    expect(authorService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all authors', async () => {
      const authors = authorService.findAll();
      expect(authors).toEqual(multipleAuthors);
    });
  });

  // describe('findOneById', () => {
  //   it('should return an author by id', async () => {
  //     const id = 1;
  //     const mockAuthor: Author = { books: [], id: 1, name: 'author name' };
  //     jest.spyOn(authorRepository, 'findOne').mockResolvedValue(mockAuthor);

  //     const result = await service.findOneById(id);

  //     expect(authorRepository.findOne).toHaveBeenCalledWith({ id });
  //     expect(result).toEqual(mockAuthor);
  //   });
  // });

  // describe('assignBooksToAuthor', () => {
  //   it('should assign books to an author', async () => {
  //     const authorId = 1;
  //     const bookIds = [2, 3];
  //     const mockAuthor: Author = { books: [], id: 1, name: 'author name' };
  //     const mockBooks: Book[] = [
  //       { authors: [], id: 2, title: 'hello' },
  //       { authors: [], id: 3, title: 'hello' },
  //     ];
  //     jest.spyOn(authorRepository, 'findOne').mockResolvedValue(mockAuthor);
  //     jest.spyOn(bookService, 'findByIds').mockResolvedValue(mockBooks);
  //     jest.spyOn(authorRepository, 'save').mockResolvedValue(mockAuthor);

  //     const result = await service.assignBooksToAuthor(authorId, bookIds);

  //     expect(authorRepository.findOne).toHaveBeenCalledWith({
  //       where: { id: authorId },
  //     });
  //     expect(bookService.findByIds).toHaveBeenCalledWith(bookIds);
  //     expect(mockAuthor.books).toEqual(mockBooks);
  //     expect(authorRepository.save).toHaveBeenCalledWith(mockAuthor);
  //     expect(result).toEqual(mockAuthor);
  //   });

  //   it('should throw an error if author is not found', async () => {
  //     const authorId = 1;
  //     const bookIds = [2, 3];
  //     jest.spyOn(authorRepository, 'findOne').mockResolvedValue(undefined);

  //     await expect(
  //       service.assignBooksToAuthor(authorId, bookIds),
  //     ).rejects.toThrowError('Author not found');
  //   });
  // });
});
