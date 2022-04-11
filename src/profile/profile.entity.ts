import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { User } from '../auth/user.entity';

@Entity('profile')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;


  @Column()
  age: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  image: string;
  @Column({
    nullable: true,
  })
  phone: string;

  @OneToOne(type => Cart, cart => cart.profile, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  cart: Cart;

  @OneToOne(type => User, user => user.profile, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;


  @Column()
  cartId: number;
}
