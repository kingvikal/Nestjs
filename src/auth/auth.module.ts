import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { OrderModule } from 'src/order/order.module';
import { CartModule } from 'src/cart/cart.module';
import { PaymentModule } from 'src/payment/payment.module';
import { ProfileModule } from 'src/profile/profile.module';
import { InvoiceModule } from 'src/Invoice/invoice.module';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions:{
        expiresIn: 3600,
      }
    }),
    TypeOrmModule.forFeature([UsersRepository]),
    forwardRef(() =>  OrderModule),
    forwardRef(() =>  CartModule),
    PaymentModule,
    ProfileModule,
    InvoiceModule,
    
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy ],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
