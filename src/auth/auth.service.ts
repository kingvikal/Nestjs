import { Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { ProfileService } from 'src/profile/profile.service';
import { PaymentService } from 'src/payment/payment.service';
import { InvoiceService } from 'src/Invoice/invoice.service';
import { CartService } from 'src/cart/cart.service';
import { OrderService } from 'src/order/order.service';
import { User } from './user.entity';

@Injectable()
export class AuthService{
  constructor (
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private profileService: ProfileService,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    private cartService: CartService,
    private orderService: OrderService,
  ){}

  async signUp(authCredentialsDto: AuthCredentialsDto,createProfileDto: CreateProfileDto,): Promise<void>{
    return this.usersRepository.createUser(authCredentialsDto, createProfileDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
    const {username, password} = authCredentialsDto;

    const user = await this.usersRepository.findOne({where:{username}});

    if(user && (await bcrypt.compare(password, user.password))){
      const payload : JwtPayload = {username};
      const accessToken: string = await this.jwtService.sign(payload);
      return {accessToken};
    }else{
      throw new UnauthorizedException('Please check your login credentials');
    }
    }
    async getAuthenticatedUser(id: number): Promise<User> {
      const currentUser = await this.usersRepository.findOne({
        where: {
          id,
        },
      });
      if (!currentUser) {
        throw new UnauthorizedException();
      }
      return currentUser;
    }

    async getUserData(id: number): Promise<any>{
      const user = await this.getAuthenticatedUser(id);
      const profile = await this.profileService.getProfileData(user);
      const cart = await this.cartService.getCart(profile.cartId);
      const cartItem = await this.cartService.getCartItem(cart.cartItemId);
      return {
        profile,
        cart,
        cartItem
      }
    }

    async getAllUsers(): Promise<User[]> {
      const users = await this.usersRepository.find();
      return users;
  }

  async existData(){
    return this.usersRepository.existData();
  }


  async deleteUser(user: User): Promise<void> {
    const orders = await this.orderService.findUserOrders(user);
    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].order_items.length; j++) {
        await this.orderService.deleteOrderItem(orders[i].order_items[j].id);
      }
    }
    for (let i = 0; i < orders.length; i++) {
      await this.orderService.deleteOrder(user, orders[i].id);
    }

    const profile = await this.profileService.getProfileData(user);
    await this.profileService.deleteProfileImage(user);
    const cart = await this.cartService.getCart(null, profile);
    const cart_item = await this.cartService.getCartItem(null, cart);

    await this.cartService.clearCartItemProducts(cart_item.id);
    await this.cartService.deleteCartItem(cart_item);
    await this.cartService.deleteCart(cart);
    await this.profileService.deleteProfile(profile);

    const payments = await this.paymentService.findPayments(user);
    for (let i = 0; i < payments.length; i++) {
      await this.paymentService.deletePayment(user, payments[i].id);
    }

    const invoices = await this.invoiceService.findInvoices();
    for (let i = 0; i < invoices.length; i++) {
      await this.invoiceService.deleteInvoice(user, invoices[i].id);
    }
    try {
      await this.usersRepository.delete(user.id);
    } catch (error) {
      console.error(error);
    }
  }


  }

