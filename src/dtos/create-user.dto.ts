import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email must be a valid email address.',
    example: 'test@gmail.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description:
      'Password must be at least 8 characters long and alphanumeric.',
    example: 'password123',
  })
  @IsString()
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9]+$/, { message: 'Password must be alphanumeric.' })
  readonly password: string;

  @ApiProperty({
    description: 'Full name must be at least 3 characters long.',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @ApiProperty({
    description: 'Age must be a number between 16 and 60.',
    example: 25,
  })
  @IsNumber()
  @Min(16)
  @Max(60)
  readonly age: number;

  @ApiProperty({
    description: 'Mobile number must start with 01 and have 11 digits.',
    example: '01234567890',
  })
  @IsString()
  @Matches(/^01\d{9}$/, {
    message: 'Mobile number must start with 01 and have 11 digits.',
  })
  readonly mobileNumber: string;
}
