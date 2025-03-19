import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { ProductsQueryDto } from '../dtos/products-query.dto';
import { ValidationPipe } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;

  const mockProductsService = {
    findAllQuery: jest.fn(),
    search: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductsService, useValue: mockProductsService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);

    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return products with query parameters', async () => {
      const query: ProductsQueryDto = { limit: 5, skip: 10 };
      const mockResponse = {
        products: [{ id: 1, title: 'Product 1' }],
        total: 100,
      };
      mockProductsService.findAllQuery.mockResolvedValue(mockResponse);

      const result = await controller.getAll(query);
      expect(result).toEqual(mockResponse);
      expect(productsService.findAllQuery).toHaveBeenCalledWith(query);
    });

    it('should return products without query parameters', async () => {
      const mockResponse = {
        products: [{ id: 1, title: 'Product 1' }],
        total: 100,
      };
      mockProductsService.findAllQuery.mockResolvedValue(mockResponse);

      const result = await controller.getAll({} as ProductsQueryDto);
      expect(result).toEqual(mockResponse);
      expect(productsService.findAllQuery).toHaveBeenCalledWith({});
    });

    it('should apply ValidationPipe and transform query parameters', async () => {
      const query = { limit: '5', skip: '10' };
      const transformedQuery: ProductsQueryDto = { limit: 5, skip: 10 };
      const mockResponse = {
        products: [{ id: 1, title: 'Product 1' }],
        total: 100,
      };
      mockProductsService.findAllQuery.mockResolvedValue(mockResponse);

      const pipe = new ValidationPipe({ transform: true });
      const transformed = await pipe.transform(query, {
        type: 'query',
        metatype: ProductsQueryDto,
      });

      const result = await controller.getAll(transformed);
      expect(result).toEqual(mockResponse);
      expect(productsService.findAllQuery).toHaveBeenCalledWith(
        transformedQuery,
      );
    });
  });

  describe('search', () => {
    it('should return search results for a valid query', async () => {
      const query = 'phone';
      const mockResponse = [{ id: 1, title: 'Phone 1' }];
      mockProductsService.search.mockResolvedValue(mockResponse);

      const result = await controller.search(query);
      expect(result).toEqual(mockResponse);
      expect(productsService.search).toHaveBeenCalledWith(query);
    });

    it('should throw an error if query is empty', () => {
      expect(() => controller.search('')).toThrow(
        'O parâmetro de busca "q" é obrigatório',
      );
      expect(productsService.search).not.toHaveBeenCalled();
    });

    it('should throw an error if query is undefined', () => {
      expect(() => controller.search(undefined)).toThrow(
        'O parâmetro de busca "q" é obrigatório',
      );
      expect(productsService.search).not.toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should return a single product for a valid ID', async () => {
      const id = 1;
      const mockResponse = { id: 1, title: 'Product 1' };
      mockProductsService.findOne.mockResolvedValue(mockResponse);

      const result = await controller.getOne(id);
      expect(result).toEqual(mockResponse);
      expect(productsService.findOne).toHaveBeenCalledWith(id);
    });

    it('should pass numeric ID correctly', async () => {
      const id = '2';
      const mockResponse = { id: 2, title: 'Product 2' };
      mockProductsService.findOne.mockResolvedValue(mockResponse);

      const result = await controller.getOne(+id);
      expect(result).toEqual(mockResponse);
      expect(productsService.findOne).toHaveBeenCalledWith(2);
    });
  });
});
