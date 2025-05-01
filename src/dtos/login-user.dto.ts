import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'Email must be a valid email address.',
    example: 'test@gmail.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Password must be at least 8 characters long.',
    example: 'password123',
  })
  @IsString()
  @MinLength(8)
  readonly password: string;
}
