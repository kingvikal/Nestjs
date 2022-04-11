import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { AuthModule } from '../auth/auth.module';
import { ProductModule } from '../product/product.module';
import { AwsModule } from '../shared/aws/aws.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRepository]),
    AuthModule,
    ProductModule,
    AwsModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions:{
        expiresIn: 3600,
      }
    }),
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService]
})
export class CategoryModule {}
