import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateBookMetadataInput {
  @Field()
  title: string;
}
