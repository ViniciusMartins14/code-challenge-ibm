import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsQueryDto } from './dtos/products-query.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getAll(@Query() query: ProductsQueryDto) {
    return this.productsService.findAllQuery(query);
  }

  @Get('search')
  search(@Query('q') query?: string) {
    if (!query) {
      throw new Error('O parâmetro de busca "q" é obrigatório');
    }

    return this.productsService.search(query);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }
}
