import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':email')
  async getOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }
}
