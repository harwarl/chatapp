import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { SocketType } from 'dgram';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { WsGuard } from 'src/auth/guards/ws-guard';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/user.service';
import { ISocket } from './types/channel.types';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: 'chat',
})
export class ChannelGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @WebSocketServer() server: Server;

  async handleConnection(client: ISocket) {
    const authHeader = client.handshake?.headers?.authorization;
    if (!authHeader) {
      throw new WsException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      client.disconnect(true);
    }

    const payload = await this.jwtService.verify(token);
    if (!payload) {
      client.disconnect(true);
    }
    const user = (await this.userService.findById(payload.id)).dataValues;

    if (!user) {
      client.disconnect(true);
    }

    client.user = user;

    console.log(`Client ${client.id} with userId ${client.user.id} connected`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('chat')
  handleMessage(client: ISocket, data: unknown): void {
    
  }
}
