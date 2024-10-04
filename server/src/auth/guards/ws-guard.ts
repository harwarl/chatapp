import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client = context.switchToWs().getClient();

      if (!client.user) {
        client.disconnect(true);
      }

      return true;
    } catch (error) {
      throw new WsException(error.message || 'Unauthorized');
    }
  }
}
