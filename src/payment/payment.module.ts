import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRepository } from './payment.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forFeature([PaymentRepository])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [
    PaymentService
  ]
})
export class PaymentModule {}
