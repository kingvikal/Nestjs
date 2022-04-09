import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { CreateProfileDto } from '../profile/dto/create-profile.dto';
import { ProfileService } from '../profile/profile.service';
import { PaymentService } from '../payment/payment.service';
import { InvoiceService } from '../invoice/invoice.service';
import { CartService } from '../cart/cart.service';
import { OrderService } from '../order/order.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: UserRepository,
    private profileService: ProfileService,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    private cartService: CartService,
    private orderService: OrderService,
  ) {
  }

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
    createProfileDto: CreateProfileDto,
  ): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto, createProfileDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async getAuthenticatedUser(id: number): Promise<User> {
    const currentUser = await this.userRepository.findOne({
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
}
