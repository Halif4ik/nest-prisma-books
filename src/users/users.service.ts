import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  async createUser(dto: CreateUserDto) {
    return 'user';
  }

  async getAllU() {
  }

  async getUserByEmail(email: string) {
  }


}
