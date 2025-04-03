import { Injectable } from '@nestjs/common';
import { UserNotFoundError } from './errors';
import { User } from '@prisma/client';
import { prisma } from 'db';

const bcrypt = require('bcryptjs'); 
import { RegisterDto } from 'src/auth/dtos/login.dto';

@Injectable()
export class UsersService {

 async createUser(data: RegisterDto): Promise<any> {
  const password =  bcrypt.hashSync(data.password, 10);

    return prisma.user.create({
      data: {
        ...data,
        password,
        username: data.username,
        address: data.address,
        cart: {},
      }
    });

  }

  async getById(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getByUsername(username: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return user;
  }
}
