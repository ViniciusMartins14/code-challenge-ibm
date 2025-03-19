import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ProductsQueryDto } from './dtos/products-query.dto';

@Injectable()
export class ProductsService {
  private readonly apiUrl = 'https://dummyjson.com/products';

  constructor(private httpService: HttpService) {}

  async findAll() {
    try {
      const response = await firstValueFrom(this.httpService.get(this.apiUrl));
      return response.data.products;
    } catch (error) {
      throw new Error('Error fetching all products');
    }
  }

  async findAllQuery(query?: ProductsQueryDto) {
    const baseUrl = 'https://dummyjson.com/products';
    const queryParams = new URLSearchParams();

    if (query && Object.keys(query).length > 0) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }

    const queryString = queryParams.toString();
    const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

    try {
      const response = await this.httpService.get(url).toPromise();

      return response?.data || [];
    } catch (error) {
      throw new Error('Falha ao buscar produtos. Tente novamente mais tarde.');
    }
  }

  async findOne(id: number) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/${id}`),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching product with ID ${id}`);
    }
  }

  async search(query: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/search?q=${query}`),
      );
      return response.data.products;
    } catch (error) {
      throw new Error(`Error searching for products with query: ${query}`);
    }
  }
}
