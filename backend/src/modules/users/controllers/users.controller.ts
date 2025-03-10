import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getCurrentUser(@CurrentUser() user: User) {
    return this.usersService.findOne(user.id);
  }

  @Put('me')
  async updateCurrentUser(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Get('me/posts')
  async getCurrentUserPosts(@CurrentUser() user: User) {
    return this.usersService.findUserPosts(user.id);
  }

  @Get('me/reactions')
  async getCurrentUserReactions(@CurrentUser() user: User) {
    return this.usersService.findUserReactions(user.id);
  }
} 