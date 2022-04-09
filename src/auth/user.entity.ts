import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Profile } from '../profile/profile.entity';
import { Order } from '../order/order.entity';
import { Invoice } from '../invoice/invoice.entity';
import { Payment } from '../payment/payment.entity';

@Entity('users')
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToOne(type => Profile, profile => profile.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  profile: Profile;

  @OneToMany(type => Order, order => order.customer, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orders: Order[];

  @OneToMany(type => Invoice, invoice => invoice.customer, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  invoices: Invoice[];

  @OneToMany(type => Payment, payment => payment.customer, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  payments: Payment[];




  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
