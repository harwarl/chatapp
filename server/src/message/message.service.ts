import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Channel } from 'src/channel/entities/channel.entity';
import sequelize from 'sequelize';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MessageService {
  //Add a new message
  async addMessage(createMessageDto: CreateMessageDto) {
    const { text, images, channelId, userId } = createMessageDto;
    try {
      const message = await Message.create({ text, images, channelId, userId });
      await Channel.update(
        {
          message: sequelize.fn(
            'array_append',
            sequelize.col('messages'),
            message.id,
          ),
        },
        {
          where: { id: message.channelId },
        },
      );

      return {
        statusCode: '201',
        message: 'Message Created Successfully',
      };
    } catch (error) {
      return {
        statusCode: '400',
        message: error,
      };
    }
  }

  //Update an existing Message
  async updateMessage({ id, message }) {
    try {
      await Message.update(message, { where: { id } });
    } catch (error) {
      return {
        statusCode: '404',
        message: 'Message not found',
      };
    }
  }

  //Delete an existing Message
  async deleteMessage({ id }) {
    try {
      await Message.destroy({ where: { id } });
    } catch (error) {
      return {
        statusCode: '404',
        message: 'Message not found',
      };
    }
  }

  //Get a single Message
  async getMessage({ id }) {
    try {
      const message = await Message.findByPk(id);
      return {
        statusCode: '200',
        message,
      };
    } catch (error) {
      return {
        statusCode: '404',
        message: 'Message not found',
      };
    }
  }

  //Get MessagesByChannel
  async getMessgaesByChannel({ id: channelId }) {
    try {
      const messages: Message[] = await Message.findAll({
        where: { channelId: channelId },
        order: [['createdAt', 'ASC']],
        include: User,
      });

      return {
        statusCode: '200',
        messages,
      };
    } catch (error) {
      return {
        statusCode: '404',
        message: 'Channel not found',
      };
    }
  }
}
