import { Field, ID, ObjectType, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType('Book')
export class BookModel {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
