import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/Product.entity';
import { User } from 'src/entity/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createProduct(productData, userId) {
    const { image, price, inventory, name, SKU, saleType } = productData;
    let product = [];
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (SKU) {
        product = await this.productRepository.find({
          where: [{ SKU: SKU }],
        });
      }
      if (product.length > 0)
        throw new BadRequestException('Ya existe un producto con este SKU');
      console.log(productData.SKU);
      const newProduct = this.productRepository.create({
        image: image ? image : null,
        inventory: inventory ? inventory : null,
        price: price,
        name: name,
        SKU: SKU ? SKU.toString() : null,
        saleType: saleType,
        userId: user,
      });

      await this.productRepository.save(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getAllProducts(userId) {
    try {
      const allProducts = await this.productRepository.findBy({
        userId: userId,
      });
      return allProducts;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
