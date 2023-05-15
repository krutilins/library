import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AssignAuthorsInput {
  @Field()
  bookId: number;

  @Field(() => [Number])
  authorIds: number[];
}
