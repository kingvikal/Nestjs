import {
  Controller,
  Post,
  Body,
  Get,
  ValidationPipe,
  Delete,
  UseGuards, Scope,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { CreateProfileDto } from '../profile/dto/create-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/register')
  signUp(
    @Body('authCredentialsDto', ValidationPipe)
      authCredentialsDto: AuthCredentialsDto,
    @Body('createProfileDto', ValidationPipe)
      createProfileDto: CreateProfileDto,
  ) {
    return this.authService.signUp(
      authCredentialsDto,
      createProfileDto,
    );
  }

  @Post('/login')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
