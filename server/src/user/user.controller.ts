import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from './decorators/user.decorator';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService){}

    //Get the Current User's Profile
    @Get()
    async getCurrentUser(@CurrentUser() currentUser: User) {
        return {currentUser}
    }

    //Get a user by his ID
    @Get(":username")
    async getUser(@Param('username') username: string){
        const user = await this.userService.findByUsername(username);
        return {user}
    }

    //Get a number of users by the search keyword
    @Get()
    async getUserBySearch(@Query('search') search: string){
        const users = await this.userService.findBySearch(search);
        return {users}
    }

    //Update the User
    @UseGuards(JwtAuthGuard)
    @Put()
    async updateCurrentUser(@CurrentUser() currentUser: User, @Body() updateUserDto: UpdateUserDto){
        return await this.userService.updateUser(currentUser, updateUserDto);
    }

    //Get User Friends
    @Get('/friends')
    async getFriends(@CurrentUser('id') currentUserId: string){
        const friends = await this.userService
    }




}
