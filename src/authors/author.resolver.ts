import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { AuthorDto, CreateAuthorInput } from './dto';

@Resolver(() => AuthorDto)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorService) {}

  @Query(() => [AuthorDto])
  async authors(): Promise<AuthorDto[]> {
    return this.authorsService.findAll();
  }

  @Query(() => AuthorDto)
  async author(@Args('id') id: number): Promise<AuthorDto> {
    return this.authorsService.findOneById(id);
  }

  @Mutation(() => AuthorDto)
  async createAuthor(
    @Args('data') createAuthorInput: CreateAuthorInput,
  ): Promise<AuthorDto> {
    return this.authorsService.create(createAuthorInput);
  }
}
