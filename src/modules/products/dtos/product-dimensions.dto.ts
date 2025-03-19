import { Field, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductDimensions {
    @Field(() => Float)
    width: number;

    @Field(() => Float)
    height: number;

    @Field(() => Float)
    depth: number;
}