import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BookDto {
  @Field()
  id: number;

  @Field()
  title: string;
}
