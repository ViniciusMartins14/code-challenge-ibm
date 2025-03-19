import { Resolver, Query, Args } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductDto } from './dtos/product.dto';

@Resolver(() => ProductDto)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductDto])
  async products() {
    return this.productsService.findAll();
  }

  @Query(() => ProductDto)
  async product(@Args('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Query(() => [ProductDto])
  async searchProducts(@Args('query') query: string) {
    return this.productsService.search(query);
  }
}
