
import { EntityRepository, Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Cart } from './cart.entity';


@EntityRepository(Cart)
export class CartRepository extends Repository<CartItem> {

}