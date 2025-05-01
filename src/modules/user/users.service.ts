import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { TSafeUser } from 'src/types/user.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email });
  }

  async findAllExcept(userId: string): Promise<TSafeUser[]> {
    return this.userModel.find({ _id: { $ne: userId } }).select('-password');
  }

  async findById(userId: string): Promise<TSafeUser | null> {
    return this.userModel.findById(userId).select('-password');
  }
}
