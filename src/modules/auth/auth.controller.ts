import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import { AuthService } from './auth.service';
import { TResponse } from 'src/types/response.types';
import { TSafeUser } from 'src/types/user.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-up')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<TResponse<Omit<TSafeUser, 'id'> | null>> {
    return this.authService.signUp(createUserDto);
  }

  @Post('sign-in')
  async signIn(
    @Body() loginDto: LoginUserDto,
  ): Promise<TResponse<{ token: string } | null>> {
    return this.authService.signIn(loginDto);
  }
}
