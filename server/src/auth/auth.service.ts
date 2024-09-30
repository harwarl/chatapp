import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcryptjs";
import { User } from 'src/user/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor (private readonly userService: UserService, private readonly jwtService: JwtService){}

  async validateUser(username: string, password: string): Promise<any> {
    let email = username;
    const user: User = await this.userService.findByEmail(email);
    if(!user){
      throw new BadRequestException("Invalid Credentials")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      throw new BadRequestException("Invalid Credentials")
    }

    delete user.password;
    return user;
  }


  async login (user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.userService.findByEmail(registerUserDto.email);
    if(user){
      throw new BadRequestException("Email already exists")
    }
    const newUser = await this.userService.createUser(registerUserDto);
    return this.login(newUser);
  }
}
