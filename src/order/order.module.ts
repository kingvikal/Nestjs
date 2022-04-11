import { Module, forwardRef } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { AuthModule } from '../auth/auth.module';
import { OrderItem } from './order_item.entity';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../auth/auth.constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository, OrderItem]),
    forwardRef(() => AuthModule),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions:{
        expiresIn: 3600,
      }
    }),   
    
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
  
})
export class OrderModule {}
