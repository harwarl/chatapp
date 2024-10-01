import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('')
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return await this.messageService.addMessage(createMessageDto);
  }

  @Put(':id')
  async updateMessage(@Param('id') id: string, @Body() body: any) {
    return await this.messageService.updateMessage({
      id,
      message: body.message,
    });
  }

  @Get(':id')
  async getMessage(@Param('id') id: string) {
    return await this.messageService.getMessage({ id });
  }

  @Get('channels/:id')
  async getMessagesByChannel(@Param('id') id: string) {
    return await this.messageService.getMessgaesByChannel({ id });
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: string) {
    return await this.messageService.deleteMessage({ id });
  }
}
