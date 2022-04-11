import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  OneToOne,
  JoinColumn,
  
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Order } from 'src/order/order.entity';
import { Payment } from 'src/payment/payment.entity';
import { Profile } from 'src/profile/profile.entity';
import { Invoice } from 'src/invoice/invoice.entity';



@Entity('users')
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
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

  @OneToMany(type => Order, order => order.user, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  orders: Order[];

  @OneToMany(type => Invoice, invoice => invoice.client, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  invoices: Invoice[];

  @OneToMany(type => Payment, payment => payment.client, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  payments: Payment[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt );
    return hash === this.password;
  }

}
