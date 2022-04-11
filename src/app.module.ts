import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { InvoiceModule } from './Invoice/invoice.module';
import { ProfileModule } from './profile/profile.module';
import { AwsModule } from './shared/aws/aws.module';
import { join } from 'path';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'postgres',
			database: 'agro_nepal_app',
			
			synchronize: true,
			entities: [join(__dirname, '**', '*.entity.{ts,js}')],
		}),
		MulterModule.register({
			dest: './files',
		  }),
		AuthModule,
		AwsModule,
		ProductModule,
		CartModule,
		CategoryModule,
		OrderModule,
		PaymentModule,
		InvoiceModule,
		ProfileModule,
		
		
		
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
