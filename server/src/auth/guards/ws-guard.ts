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
      const authHeader = client.handshake?.headers?.authorization;

      if (!authHeader) {
        throw new WsException('Authorization header is missing');
      }

      const token = authHeader.split(' ')[1];
      console.log({ token });

      if (!token) {
        throw new WsException('Token is missing');
      }

      // Verify the JWT token
      const payload = await this.jwtService.verify(token);
      // Fetch the user using the token's payload (e.g., user id)
      const user = await this.userService.findById(payload.id);

      if (!user) {
        throw new WsException('Invalid token or user not found');
      }

      // Attach the user to the client object
      client.user = user;

      return true;
    } catch (error) {
      throw new WsException(error.message || 'Unauthorized');
    }
  }
}
