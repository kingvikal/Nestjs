import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CartModule } from '../cart/cart.module';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../auth/auth.constants';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    CartModule,
    TypeOrmModule.forFeature([ProductRepository]),
    PassportModule.register({
      defaultStrategy: jwtConstants.strategy    
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
