import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorMetadataInput {
  @Field()
  name: string;
}
