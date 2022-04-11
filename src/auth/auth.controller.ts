import {Body, Controller, Post} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';

@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService){}


  @Post('/signup')
  signUp(@Body()authCredentialsDto: AuthCredentialsDto,createProfileDto: CreateProfileDto,): Promise<void>{
    return this.authService.signUp(authCredentialsDto, createProfileDto);
  }

  @Post('/signin')
  signIn(@Body()authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}>{
    return this.authService.signIn(authCredentialsDto);
}
}