import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserBody } from '../dtos/create-user.body';

import { UsersService } from '../services/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  async registerUser(@Body() body: CreateUserBody) {
    const { name, email, password, avatar } = body;

    return await this.usersService.registerUser(name, email, password, avatar);
  }
}
