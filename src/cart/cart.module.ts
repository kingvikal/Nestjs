import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController, CartItemController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cart } from './cart.entity';
import { CartItem } from './cart-item.entity';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../auth/auth.constants';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [ AuthModule,
    TypeOrmModule.forFeature([Cart, CartItem]),
    forwardRef(() => AuthModule),
    forwardRef(() => OrderModule),
    
    PassportModule.register({
      defaultStrategy: jwtConstants.strategy    
    }),
  ],
  providers: [CartService],
  controllers: [CartController, CartItemController],
  exports: [CartService],
})
export class CartModule {}
