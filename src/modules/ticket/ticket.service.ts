import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/Product.entity';
import { Ticket } from 'src/entity/Ticket.entity';
import { TicketProducts } from 'src/entity/TicketProducts';
import { User } from 'src/entity/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(TicketProducts)
    private ticketProdsRepository: Repository<TicketProducts>,
  ) {}

  async newTicket(ticketData, userId) {
    const { total, state, payType, products, recivedCash, returnedCash } =
      ticketData;
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) throw new NotFoundException('usuario no encontrado');

      const newTicket = this.ticketRepository.create({
        total,
        state,
        payType,
        userId: user,
        recivedCash,
        returnedCash,
      });

      await this.ticketRepository.save(newTicket);

      const ticketProducts = await Promise.all(
        products.map(async (item) => {
          const product = await this.productRepository.findOneBy({
            id: item.id,
          });
          if (!product)
            throw new NotFoundException(
              `producto ${item.productId} no encontrado`,
            );
          const subtotal = product.price * item.qty;
          return this.ticketProdsRepository.create({
            ticket: newTicket,
            product,
            quantity: item.qty,
            subtotal: subtotal,
          });
        }),
      );

      await this.ticketProdsRepository.save(ticketProducts);
      return {
        ticket: {
          id: newTicket.id,
          total: newTicket.total,
          products: ticketProducts.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            productTotal: item.subtotal,
          })),
        },
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
