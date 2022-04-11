import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { PassportModule } from '@nestjs/passport';
import { AwsModule } from '../shared/aws/aws.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileRepository]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions:{
        expiresIn: 3600,
      }
    
        
  }),
  AwsModule,
  forwardRef(() =>  AuthModule),],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
