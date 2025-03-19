import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { ProductsQueryDto } from '../dtos/products-query.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpService: HttpService;

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    httpService = module.get<HttpService>(HttpService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of products on success', async () => {
      const mockResponse = {
        data: { products: [{ id: 1, title: 'Product 1' }] },
      };
      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.findAll();
      expect(result).toEqual(mockResponse.data.products);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://dummyjson.com/products',
      );
    });

    it('should throw an error on failure', async () => {
      mockHttpService.get.mockReturnValue({
        toPromise: () => Promise.reject(new Error('Network error')),
      });

      await expect(service.findAll()).rejects.toThrow(
        'Error fetching all products',
      );
    });

    it('should handle malformed response with undefined products', async () => {
      const mockResponse = { data: {} };
      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.findAll();
      expect(result).toEqual(undefined);
    });
  });

  describe('findAllQuery', () => {
    it('should return products with query parameters', async () => {
      const query: ProductsQueryDto = { limit: 5, skip: 10 };
      const mockResponse = {
        data: { products: [{ id: 1, title: 'Product 1' }], total: 100 },
      };
      mockHttpService.get.mockReturnValue({
        toPromise: () => Promise.resolve(mockResponse),
      });

      const result = await service.findAllQuery(query);
      expect(result).toEqual(mockResponse.data);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://dummyjson.com/products?limit=5&skip=10',
      );
    });

    it('should return products without query parameters when query is undefined', async () => {
      const mockResponse = {
        data: { products: [{ id: 1, title: 'Product 1' }], total: 100 },
      };
      mockHttpService.get.mockReturnValue({
        toPromise: () => Promise.resolve(mockResponse),
      });

      const result = await service.findAllQuery();
      expect(result).toEqual(mockResponse.data);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://dummyjson.com/products',
      );
    });

    it('should throw an error on failure', async () => {
      const query: ProductsQueryDto = { limit: 5 };
      mockHttpService.get.mockReturnValue({
        toPromise: () => Promise.reject(new Error('Network error')),
      });

      await expect(service.findAllQuery(query)).rejects.toThrow(
        'Falha ao buscar produtos. Tente novamente mais tarde.',
      );
    });

    it('should handle invalid query values gracefully', async () => {
      const query: ProductsQueryDto = { limit: -1, order: 'invalid' } as any;
      const mockResponse = { data: { products: [] } };
      mockHttpService.get.mockReturnValue({
        toPromise: () => Promise.resolve(mockResponse),
      });

      const result = await service.findAllQuery(query);
      expect(result).toEqual(mockResponse.data);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://dummyjson.com/products?limit=-1&order=invalid',
      );
    });

    it('should return empty array if response.data is undefined', async () => {
      mockHttpService.get.mockReturnValue({
        toPromise: () => Promise.resolve({}),
      });

      const result = await service.findAllQuery();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a single product on success', async () => {
      const mockResponse = { data: { id: 1, title: 'Product 1' } };
      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.findOne(1);
      expect(result).toEqual(mockResponse.data);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://dummyjson.com/products/1',
      );
    });

    it('should throw an error on failure', async () => {
      mockHttpService.get.mockReturnValue({
        toPromise: () => Promise.reject(new Error('Not found')),
      });

      await expect(service.findOne(1)).rejects.toThrow(
        'Error fetching product with ID 1',
      );
    });

    it('should handle malformed response', async () => {
      const mockResponse = { data: undefined };
      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.findOne(1);
      expect(result).toBeUndefined(); // Ou ajuste para lançar erro se preferir
    });
  });

  describe('search', () => {
    it('should return an array of products matching the query', async () => {
      const mockResponse = {
        data: { products: [{ id: 1, title: 'Product 1' }] },
      };
      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.search('phone');
      expect(result).toEqual(mockResponse.data.products);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://dummyjson.com/products/search?q=phone',
      );
    });

    it('should throw an error on failure', async () => {
      mockHttpService.get.mockReturnValue({
        toPromise: () => Promise.reject(new Error('Search error')),
      });

      await expect(service.search('phone')).rejects.toThrow(
        'Error searching for products with query: phone',
      );
    });

    it('should handle empty query string', async () => {
      const mockResponse = { data: { products: [] } };
      mockHttpService.get.mockReturnValue(of(mockResponse));

      const result = await service.search('');
      expect(result).toEqual(mockResponse.data.products);
      expect(httpService.get).toHaveBeenCalledWith(
        'https://dummyjson.com/products/search?q=',
      );
    });
  });
});
