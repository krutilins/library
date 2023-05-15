import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AssignBooksInput {
  @Field()
  authorId: number;

  @Field(() => [Number])
  bookIds: number[];
}
