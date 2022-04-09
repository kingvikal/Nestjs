import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../auth/user.entity';
import { CreatePaymentDto } from '../payment/dto/create-payment.dto';
import { Payment } from '../payment/payment.entity';
import { Invoice } from '../invoice/invoice.entity';
import { OrderItem } from './order_item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {OrderStatus} from  './order-status.enum'
@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {
  }

  async findUserOrders(user: User): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: {
        user,
      },
    });
    if (!orders) {
      throw new NotFoundException(`User has no orders`);
    }

    let today = new Date();
    for(let i=0; i < orders.length; i++) {
    
      let date = orders[i].order_date;
      const threeDaysLater = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3);
      const eightDaysLater = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);

      if(threeDaysLater.getDate() === today.getDate()){
            orders[i].status = OrderStatus.SHIPPED;
            await orders[i].save();
       }
      else if(eightDaysLater.getDate() === today.getDate()){
            orders[i].status = OrderStatus.DELIVERED;
            await orders[i].save();
      } 
      else {
             orders[i].status = OrderStatus.PROCESSED
        }
    }
    return orders;
  }

  async findOrder(user: User, id: number): Promise<Order> {
    const order = this.orderRepository.findOne({
      where: {
        user,
        id,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async deleteOrder(user: User, orderId: number): Promise<void> {
    const order = await this.findOrder(user, orderId);
    const result = await this.orderRepository.delete(order);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
  }

  async findOrderItem(id: number): Promise<OrderItem> {
    const orderItems= this.orderItemRepository.findOne({
      where: {
        id,
      },
    });
    if (!orderItems) {
      throw new NotFoundException(`Order Item with id ${id} not found`);
    }
    return orderItems;
  }

  async deleteOrderItem(id: number): Promise<void> {
    const orderItems = await this.findOrderItem(id);
    const result = await this.orderItemRepository.delete(orderItems);
    if (result.affected === 0) {
      throw new NotFoundException(`Order Item with id ${id} not found`);
    }
  }

  async completeOrder(
    customer: User,
    orderId: number,
    createPaymentDto: CreatePaymentDto,
  ): Promise<void> {
    const order = customer.orders.find(order => order.id === orderId);
    const { payment_method } = createPaymentDto;
    const payment = new Payment();
    payment.date = new Date();
    payment.customer = customer;
    payment.payment_method = payment_method;
    const invoice = await this.createInvoice(customer, payment, order);
    order.invoice = invoice;
    payment.invoice = invoice;
    payment.amount = invoice.invoice_total;
    try {
      customer.payments.push(await payment.save());
      await order.save();
    } catch (error) {
      console.error(error);
    }
  }

  async createInvoice(
    user: User,
    payment: Payment,
    order: Order,
  ): Promise<Invoice> {
    const today = new Date();
    const invoice = new Invoice();
    invoice.customer = user;
    invoice.order = order;
    invoice.invoice_date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    invoice.payment = payment;
    let total_amount = 0;

    for (let i = 0; i < order.order_items.length; i++) {
      total_amount += order.order_items[i].totalPrice;
    }

    invoice.invoice_total = total_amount;
    invoice.payment_date = payment.date;
    invoice.number = `${Math.random() + '-' + Date.now() + '.'}`;

    try {
      user.invoices.push(await invoice.save());
      return invoice;
    } catch (error) {
      console.error(error);
    }
  }
}