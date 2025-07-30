import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto } from 'src/dtos/createProduct.dto';
import { Product } from 'src/entity/Product.entity';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() productData: createProductDto,
    @Req() req,
  ): Promise<Product> {
    const userId = req.user['userId'];
    return await this.productService.createProduct(productData, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProducts(@Req() req): Promise<Product[]> {
    const userId = req.user['userId'];
    return await this.productService.getAllProducts(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async editProducts(
    @Param('id') id,
    @Body() newDataProduct: createProductDto,
  ) {
    return await this.productService.editProduct(id, newDataProduct);
  }
}
