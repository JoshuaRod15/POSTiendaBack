import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { saleTypeProduct } from 'src/enum/saleTypeProduct.enum';

export class createProductDto {
  @IsString()
  image?: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  inventory?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  SKU: string;

  @IsEnum(saleTypeProduct, { each: true })
  @IsNotEmpty()
  saleType: saleTypeProduct;
}
