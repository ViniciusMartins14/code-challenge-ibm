import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReviewsProduct {
  @Field(() => Int)
  rating: number;

  @Field()
  comment: string;

  @Field()
  date: string;

  @Field()
  reviewerName: string;

  @Field()
  reviewerEmail: string;
}
