import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body('user') registerUserDto: RegisterUserDto) {
      return await this.authService.register(registerUserDto);
    
  }
  
  @UseGuards(LocalAuthGuard) 
  @Post('login')
  async login(@Request() req: any) {  
      return this.authService.login(req.user); 
  }
}
