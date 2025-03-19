import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { ReviewsProduct } from './reviews-product.dto';
import { ProductDimensions } from './product-dimensions.dto';
import { ProductMeta } from './product-meta.dto';

@ObjectType()
export class ProductDto {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  discountPercentage: number;

  @Field(() => Float)
  rating: number;

  @Field(() => Int)
  stock: number;

  @Field()
  sku: string;

  @Field(() => Float)
  weight: number;

  @Field(() => ProductDimensions)
  dimensions: ProductDimensions;

  @Field()
  warrantyInformation: string;

  @Field()
  shippingInformation: string;

  @Field()
  availabilityStatus: string;

  @Field()
  category: string;

  @Field()
  thumbnail: string;

  @Field(() => [String])
  tags: string[];

  @Field({ nullable: true })
  brand?: string;

  @Field(() => [ReviewsProduct])
  reviews: ReviewsProduct[];

  @Field()
  returnPolicy: string;

  @Field(() => Int)
  minimumOrderQuantity: number;

  @Field(() => ProductMeta)
  meta: ProductMeta;

  @Field(() => [String]) 
  images: string[];
}
