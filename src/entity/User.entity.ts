import { UserRole } from 'src/enum/userRole.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ManyToOne(() => User, (user) => user.employees)
  admin?: User;

  @OneToMany(() => User, (user) => user.admin)
  employees?: User[];

  @Column({
    type: 'simple-array',
    default: 'LOCAL',
  })
  features: string[];
}
