import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { Profile } from "src/profile/profile.entity";
import { Cart } from "src/cart/cart.entity";
import { CartItem } from "src/cart/cart-item.entity";
import { CreateProfileDto } from "src/profile/dto/create-profile.dto";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{
  async createUser(authCredentialsDto:AuthCredentialsDto, createProfileDto: CreateProfileDto): Promise<void>{
    const {username, password} = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({username, password: hashedPassword});

    try{
    await this.save(user);
    }catch (error){
      if(error.code === '23505'){
        throw new ConflictException('Username already exists');
      }else {
        const profile = await this.createProfile(user, createProfileDto);
        user.profile = profile;
        user.orders = [];
        // user.invoices = [];
        user.payments = [];
        await user.save();
      
      }
      
    }
  
  }
  async createProfile(
    user: User,
    createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    const {
      firstname,
      lastname,
      phone,
      age,
      city,
      address,
    } = createProfileDto;
    const profile = new Profile();
    profile.firstname = firstname;
    profile.lastname = lastname;
    profile.age = age;
    profile.city = city;
    profile.address = address;
    profile.phone = phone;
    profile.user = user;
    const cart = await this.createCart(profile);
    profile.cart = cart;
    try {
      await profile.save();
      return profile;
    } catch (err) {
      console.error(err);
    }
  }

  async createCart(profile: Profile): Promise<Cart> {
    const cart = new Cart();
    const cart_item = await this.createCartItem(cart);
    cart.cart_item = cart_item;
    cart.profile = profile;
    try {
      await cart.save();
      return cart;
    } catch (err) {
      console.error(err);
    }
  }

  async createCartItem(cart: Cart): Promise<CartItem> {
    const cart_item = new CartItem();
    cart_item.total_products = 0;
    cart_item.cart = cart;
    cart_item.products = [];
    try {
      await cart_item.save();
      return cart_item;
    } catch (error) {
      console.error(error);
    }
  }

  async existData() {
    const availableData = {
      totalUsers: 0,
      totalOrders: 0,
      totalPayments: 0,
      totalInvoices: 0,
    };
    const users = await this.find();
    for (let i = 0; i < users.length; i++) {
      availableData.totalUsers++;
      if (users[i].invoices) {
        for (let j = 0; j < users[i].invoices.length; j++) {
          availableData.totalInvoices++;
        }
      }
      if (users[i].orders) {
        for (let j = 0; j < users[i].orders.length; j++) {
          availableData.totalOrders++;
        }
      }
      if (users[i].payments) {
        for (let j = 0; j < users[i].payments.length; j++) {
          availableData.totalPayments++;
        }
      }
    }
    return availableData;
  }
  
}
