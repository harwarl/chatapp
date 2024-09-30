import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body('user') registerUserDto: RegisterUserDto) {
    try {
      return await this.authService.register(registerUserDto);
    } catch (error) {
      throw new Error('Registration failed: ' + error.message);
    }
  }

  @Public()
  @UseGuards(LocalAuthGuard) 
  @Post('login')
  async login(@Request() req: any) {  
    try{
      return this.authService.login(req.user); 
    }catch(error){
      throw new Error("Login Failed: " + error.message)
    }
  }
}
