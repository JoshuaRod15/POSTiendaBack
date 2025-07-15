import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Ticket } from './Ticket.entity';
import { Product } from './Product.entity';

@Entity('ticket_products')
export class TicketProducts {
  @PrimaryColumn()
  ticketId: number;

  @PrimaryColumn()
  productId: number;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ticketId' })
  ticket: Ticket;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column('int')
  quantity: number;

  @Column('numeric')
  subtotal: number;
}
