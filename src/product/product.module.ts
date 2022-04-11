import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CartModule } from '../cart/cart.module';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../auth/auth.constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CartModule,
    TypeOrmModule.forFeature([ProductRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions:{
        expiresIn: 3600,
      }
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
