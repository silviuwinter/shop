import { Injectable } from '@nestjs/common';
import { UserNotFoundError } from './errors';
import { User } from '@prisma/client';
import { prisma } from 'db';

const bcrypt = require('bcryptjs'); 
import { RegisterDto } from 'src/auth/dtos/login.dto';

// this file handles all the user-related logic, like creating, updating, or fetching users

@Injectable()
export class UsersService {

 async createUser(data: RegisterDto): Promise<any> {
  // creates a new user in the database
  const password =  bcrypt.hashSync(data.password, 10); // hashes the password for security

    return prisma.user.create({
      data: {
        ...data, // spreads the rest of the user data
        password, // saves the hashed password
        username: data.username, // sets the username
        address: data.address, // sets the address
        cart: {}, // initializes an empty cart
      }
    });
  }

  async getById(id: number): Promise<User> {
    // fetches a user by their id
    const user = await prisma.user.findUnique({
      where: {
        id, // looks for a user with this id
      },
    });
    
    if (!user) {
      throw new UserNotFoundError(); // throws an error if no user is found
    }
    return user; // returns the user
  }

  async getByEmail(email: string): Promise<User | null> {
    // fetches a user by their email
    return prisma.user.findUnique({
      where: {
        email, // looks for a user with this email
      },
    });
  }

  async getByUsername(username: string): Promise<User | null> {
    // fetches a user by their username
    return prisma.user.findFirst({
      where: {
        username, // looks for a user with this username
      },
    });
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    // updates a user's data
    const user = await prisma.user.update({
      where: {
        id, // finds the user by id
      },
      data, // updates the user with the provided data
    });
    return user; // returns the updated user
  }
}
