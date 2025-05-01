import { TJwtPayload } from './../../types/jwt.types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { TSafeUser } from 'src/types/user.types';
import { UsersService } from 'src/modules/user/users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { LoginUserDto } from 'src/dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { TResponse } from 'src/types/response.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  generateToken(user: TSafeUser): string {
    return jwt.sign(
      { id: user.id, email: user.email },
      this.configService.getOrThrow<string>('JWT_SECRET'),
      { expiresIn: this.configService.getOrThrow<string>('JWT_EXPIRES_IN') },
    );
  }

  verifyToken(token: string): TJwtPayload {
    try {
      return jwt.verify(
        token,
        this.configService.getOrThrow<string>('JWT_SECRET'),
      );
    } catch (err) {
      throw new UnauthorizedException('Invalid token', err.message);
    }
  }

  async signUp(
    createUserDto: CreateUserDto,
  ): Promise<TResponse<Omit<TSafeUser, 'id'> | null>> {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      return {
        status: 400,
        message: 'User already exists',
        data: null,
      };
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    if (!newUser) {
      return {
        status: 500,
        message: 'Failed to create user',
        data: null,
      };
    }
    const { password, ...safeUser } = newUser.toObject();
    return {
      status: 200,
      message: 'User created successfully',
      data: safeUser,
    };
  }
  async signIn(
    loginDto: LoginUserDto,
  ): Promise<TResponse<{ token: string } | null>> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      return {
        status: 401,
        message: 'Invalid email or password',
        data: null,
      };
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      return {
        status: 401,
        message: 'Invalid email or password',
        data: null,
      };
    }
    const safeUser: TSafeUser = {
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      age: user.age,
      mobileNumber: user.mobileNumber,
    };
    const token = this.generateToken(safeUser);
    return {
      status: 200,
      message: 'Login successful',
      data: { token },
    };
  }
}
