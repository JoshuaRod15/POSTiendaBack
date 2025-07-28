import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { saleTypeProduct } from 'src/enum/saleTypeProduct.enum';
import { User } from './User.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  image: string;

  @Column('numeric')
  price: number;

  @Column('numeric', { nullable: true })
  inventory: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  SKU: number;

  @Column('text', { array: true })
  saleType: saleTypeProduct[];

  @ManyToOne(() => User, (user) => user.id)
  userId: User;
}
