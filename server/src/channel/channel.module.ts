import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { ChannelGateway } from './channel.gateway';
import { MessageModule } from 'src/message/message.module';
import { MessageService } from 'src/message/message.service';

@Module({
  imports: [MessageModule],
  controllers: [ChannelController],
  providers: [ChannelService, ChannelGateway],
})
export class ChannelModule {}
