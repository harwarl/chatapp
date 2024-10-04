import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsGuard } from 'src/auth/guards/ws-guard';
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

  @UseGuards(WsGuard)
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody()
    createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: ISocket,
  ): Promise<void> {
    console.log(
      `Client ${client.id} sended message: ${createMessageDto.text} to room: ${createMessageDto.channelId}`,
    );
    console.log({ createMessageDto });
    const message = await this.messageService.addMessage({
      ...createMessageDto,
      userId: client.user.id,
    });

    client.emit('message', message);
    client.to(createMessageDto.channelId).emit('message', message);
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() data: { channelId: string },
    @ConnectedSocket() client: ISocket,
  ): string {
    console.log(
      `Client ${client.id} with User Id ${client.user.id} joined ${data.channelId}`,
    );
    client.join(data.channelId);
    return data.channelId;
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('leave')
  handleLeave(
    @MessageBody() data: { channelId: string },
    @ConnectedSocket() client: ISocket,
  ): string {
    console.log(
      `Client ${client.id} with User Id ${client.user.id} left ${data.channelId}`,
    );
    client.leave(data.channelId);
    return data.channelId;
  }

  @UseGuards(WsGuard)
  @SubscribeMessage('typingNotification')
  handleMessageNotification(
    @MessageBody() data: { channelId: string },
    @ConnectedSocket() client: ISocket,
  ): void {
    console.log('Is Typing');
    client
      .to(data.channelId)
      .emit('isTyping', `${client.user.username} is typing`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }
}
