import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TResponse, TResponseWithUser } from 'src/types/response.types';
import { TSafeUser } from 'src/types/user.types';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('my-profile')
  async myProfile(
    @Req() req: TResponseWithUser,
  ): Promise<TResponse<TSafeUser | null>> {
    const userId = req.user.id;
    const user = await this.usersService.findById(userId);
    if (!user) {
      return {
        status: 404,
        message: 'User not found',
        data: null,
      };
    }
    return {
      status: 200,
      data: user,
      message: 'User fetched successfully',
    };
  }

  @Get('all')
  async findAll(
    @Req() req: TResponseWithUser,
  ): Promise<TResponse<TSafeUser[]>> {
    const userId = req.user.id;
    const users = await this.usersService.findAllExcept(userId);
    return {
      status: 200,
      data: users,
      message: 'Users fetched successfully',
    };
  }
}
