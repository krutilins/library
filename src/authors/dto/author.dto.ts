import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorDto {
  @Field()
  id: number;

  @Field()
  name: string;
}
