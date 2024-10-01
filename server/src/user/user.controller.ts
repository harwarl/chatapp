import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from './decorators/user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //Get the Current User's Profile
  @Get()
  async getCurrentUser(@CurrentUser() currentUser: User) {
    return { currentUser };
  }

  //Get a user by his ID
  @Public()
  @Get(':username')
  async getUser(@Param('username') username: string) {
    const user = await this.userService.findByUsername(username);
    return { user };
  }

  //Get a number of users by the search keyword
  @Public()
  @Get()
  async getUserBySearch(@Query('search') search: string) {
    const users = await this.userService.findBySearch(search);
    return { users };
  }

  //Update the User
  @Put()
  async updateCurrentUser(
    @CurrentUser() currentUser: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(currentUser, updateUserDto);
  }

  //Get User Friends
  @Get('/friends')
  async getFriends(@CurrentUser('id') currentUserId: string) {
    return await this.userService.getUserFriends(currentUserId);
  }

  //Get Blocked Friends
  @Get('/blocked')
  async getBlockedFriends(@CurrentUser('id') currentUserId: string) {
    return await this.userService.getBlockedUsers(currentUserId);
  }

  //Get User Pending Requests
  @Get('/requests')
  async getUserRequests(@CurrentUser('id') currentUserId: string) {
    return await this.userService.getUserRequest(currentUserId);
  }

  //Set Friends
  @Put('friend')
  async setFriend(@CurrentUser('id') currentUserId: string, @Body() body) {
    return await this.userService.setFriend(
      currentUserId,
      body.friendId,
      body.status,
    );
  }

  //Set Request
  @Put('request')
  async setRequest(
    @CurrentUser('id') currentUserId: string,
    @Body() body: any,
  ) {
    return await this.userService.setRequest(
      currentUserId,
      body.friendId,
      body.status,
    );
  }

  //Set Block
  @Put('block')
  async setBlock(@CurrentUser('id') currentUserId: string, @Body() body: any) {
    return await this.userService.setBlocked(
      currentUserId,
      body.friendId,
      body.status,
    );
  }
}
