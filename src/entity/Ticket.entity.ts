import { payType } from 'src/enum/payTape.enum';
import { ticketState } from 'src/enum/ticketState.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User.entity';
import { TicketProducts } from './TicketProducts';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('numeric')
  total: number;

  @Column()
  state: ticketState;

  @Column()
  payType: payType;

  @ManyToOne(() => User, (user) => user.id)
  userId: User;

  @Column('float8', { nullable: true })
  recivedCash: number;

  @Column('float8', { nullable: true })
  returnedCash: number;

  @OneToMany(() => TicketProducts, (tp) => tp.ticket)
  ticketProducts: TicketProducts[];
}
