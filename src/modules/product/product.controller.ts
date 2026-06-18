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
import { RolesGuard } from 'src/guard/RolesGuard.guard';
import { UserRole } from 'src/enum/userRole.enum';
import { Roles } from 'src/help/roles.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User.entity';
import { Repository } from 'typeorm';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
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
    const user = await this.userRepository.findBy(userId);
    return await this.productService.getAllProducts(user[0]);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  async editProducts(
    @Param('id') id,
    @Body() newDataProduct: createProductDto,
  ) {
    return await this.productService.editProduct(id, newDataProduct);
  }
}
