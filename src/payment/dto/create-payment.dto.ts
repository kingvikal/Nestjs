import { PaymentMethod } from '../payment-methods.enum';
import { IsIn } from 'class-validator';

export class CreatePaymentDto {
  @IsIn([
    PaymentMethod.Esewa,
    PaymentMethod.Khalti,
    PaymentMethod.Cash,
  ])
  payment_method: PaymentMethod;
}
