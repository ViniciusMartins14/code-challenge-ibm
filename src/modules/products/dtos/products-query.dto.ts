import { IsOptional, IsString, IsInt, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ProductsQueryDto {
  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  skip?: number;

  @IsOptional()
  @IsString()
  select?: string;
}
