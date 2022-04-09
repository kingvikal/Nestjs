import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ProfileModule } from './profile/profile.module';
import { AwsModule } from './aws/aws.module';
import { InvoiceModule } from './invoice/invoice.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
	imports: [
		

		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: parseInt(<string>process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DATABASE,
			
			synchronize: true,
			entities: [__dirname + '/**/*.entity{.ts,.js}'],
		}),
		
		MulterModule.register({
			dest: './files',
		  }),
		AuthModule,
		ProductModule,
		CartModule,
		CategoryModule,
		OrderModule,
		PaymentModule,
		ProfileModule,
		AwsModule,
		InvoiceModule,
		
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
