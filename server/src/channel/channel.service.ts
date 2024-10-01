import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from './entities/channel.entity';
import { User } from 'src/user/entities/user.entity';
import { Op } from 'sequelize';
import { Message } from 'src/message/entities/message.entity';

@Injectable()
export class ChannelService {
  async createChannel({
    participants,
    admins,
    name,
    description,
    image,
  }: CreateChannelDto) {
    try {
      const channel = await Channel.create({
        participants,
        admins,
        name,
        description,
        image,
      });

      return {
        statusCode: '200',
        message: 'Channel created succesfully',
        channel,
      };
    } catch (error) {
      return {
        statusCode: '400',
        message: error,
      };
    }
  }

  async updateChannel({ id, channel }) {
    try {
      await Channel.update(channel, {
        where: { id },
      });

      return {
        statusCode: '200',
        message: 'Channel updated successfully',
      };
    } catch (error) {
      return {
        statusCode: '404',
        message: 'Channel not found',
      };
    }
  }

  async deleteChannel({ id }) {
    try {
      await Channel.destroy({ where: { id } });
    } catch (error) {
      return {
        statusCode: '404',
        message: 'Channel not found',
      };
    }
  }

  async getChannel(id: string) {
    try {
      const channel: Channel = await Channel.findByPk(id);
      const participants = [];

      for (let i = 0; i < channel.participants.length; i++) {
        const user = await User.findByPk(channel.participants[i]);
        participants.push(user);
      }

      channel.participants = participants;
      return {
        statusCode: '200',
        message: 'Channel Retrieved SuccessFully',
        channel,
      };
    } catch (error) {
      return {
        statusCode: '404',
        message: 'Channel not found',
      };
    }
  }

  async getChannelsByUser(userId: string) {
    try {
      const channels = await Channel.findAll({
        where: {
          participants: {
            [Op.contains]: [userId],
          },
        },
        order: [['updatedAt', 'ASC']],
        attributes: { exclude: ['messages', 'createdAt'] },
      });

      //Get the channels Last Messages
      const lastMessages: Message[] = [];
      for (let i = 0; i < channels.length; i++) {
        const lastMessage = await Message.findOne({
          where: { channelId: channels[i].id },
          order: [['createdAt', 'DESC']],
        });
        lastMessages.push(lastMessage);
      }

      return {
        statusCode: '200',
        message: 'User Channels retrieved successfully',
        channels,
        lastMessages,
      };
    } catch (error) {
      return {
        statusCode: '404',
        message: 'User or Channels not found',
      };
    }
  }
}
