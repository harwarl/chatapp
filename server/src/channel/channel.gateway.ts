import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { MessageService } from 'src/message/message.service';

@WebSocketGateway({
  cors: true,
})
export class ChannelGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('chat')
  handleMessage(@MessageBody() message: CreateMessageDto): void {
    this.server.emit('chat', message);
    this.messageService;
  }
}
