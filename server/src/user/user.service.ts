import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Op } from 'sequelize';
import sequelize from 'sequelize';
import { exists } from 'fs';

@Injectable()
export class UserService {
  //Find User by Username
  async findByUsername(username: string): Promise<User | undefined> {
    const user = await User.findOne({ where: { username: username } });
    return user;
  }

  //Find User by Email
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await User.findOne({ where: { email: email } });
    return user;
  }

  //Find User by Id
  async findById(id: string): Promise<User | undefined> {
    return await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
  }

  //FInd Users By Search
  async findBySearch(searchTerm: string): Promise<any> {
    const user = await User.findAll({
      where: {
        username: {
          [Op.iLike]: `${searchTerm}%`,
        },
      },
    });

    return user;
  }

  //Create User
  async createUser(createUserDto: CreateUserDto): Promise<User | undefined> {
    const user = await User.create({
      email: createUserDto.email,
      username: createUserDto.username,
      password: createUserDto.password,
    });

    return user;
  }

  //Update User Information
  async updateUser(currentUser: User, updateUserDto: UpdateUserDto) {
    try {
      const user = await User.update(updateUserDto, {
        where: { id: currentUser.id },
      });
      return {
        statusCode: 200,
        message: 'User updated successfully',
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: 'Could not update',
      };
    }
  }

  //Set Request
  async setRequest(currentUserId: string, friendId: string, status: boolean) {
    const currentUser = await this.findById(currentUserId);
    const secondUser = await this.findById(friendId);

    //check if second user exists
    if (!currentUser || !secondUser)
      throw new NotFoundException('User Not Found.');

    //check if the currentUser already blocked the intending friend or it is the other way
    if (
      (currentUser.blocked && currentUser.blocked.includes(friendId)) ||
      (secondUser.blocked && secondUser.blocked.includes(currentUser.id))
    )
      return {
        statusCode: 406,
        message: 'You can not do this. You are blocked.',
      };

    //Check if the user is already friends with the person
    if (status && currentUser.friends && currentUser.friends.includes(friendId))
      return {
        statusCode: 409,
        message: 'You are already friends',
      };

    //Check if the current User has already sent them a request
    if (
      status &&
      secondUser.requests &&
      secondUser.requests.includes(currentUser.id)
    )
      return {
        statusCode: 409,
        message: 'You already sent a request to this user',
      };

    //update the array
    if (status) {
      User.update(
        {
          requests: sequelize.fn(
            'array_append',
            sequelize.col('requests'),
            currentUser.id,
          ),
        },
        { where: { id: friendId } },
      );
    } else {
      User.update(
        {
          requests: sequelize.fn(
            'array_remove',
            sequelize.col('requests'),
            currentUser.id,
          ),
        },
        { where: { id: friendId } },
      );
    }

    return {
      statusCode: 200,
      message: 'User updated successfully.',
    };
  }

  //Set Friend
  async setFriend(currentUserId: string, friendId: string, status: boolean) {
    const currentUser = await this.findById(currentUserId);
    const secondUser = await this.findById(friendId);

    if (!secondUser) throw new NotFoundException('User not found.');

    //check if user is blocked
    if (
      (currentUser.blocked && currentUser.blocked.includes(friendId)) ||
      (secondUser.blocked && secondUser.blocked.includes(currentUser.id))
    )
      return {
        statusCode: 406,
        message: 'You cannot do this, You are blocked.',
      };

    //Check if users are already friends
    if (status && currentUser.friends && currentUser.friends.includes(friendId))
      return {
        statusCode: 409,
        message: 'You are already friends',
      };

    if (status) {
      //Set Reqeust status to false
      this.setRequest(secondUser.id, currentUser.id, false);

      //Add the secondUser as friend to the current User friends List
      User.update(
        {
          friends: sequelize.fn(
            'array_append',
            sequelize.col('friends'),
            friendId,
          ),
        },
        { where: { id: currentUser.id } },
      );

      //Add the currentUser as friends to the second Users Friends List
      User.update(
        {
          friends: sequelize.fn(
            'array_append',
            sequelize.col('friends'),
            currentUser.id,
          ),
        },
        { where: { id: friendId } },
      );
    } else {
      User.update(
        {
          friends: sequelize.fn(
            'array_remove',
            sequelize.col('friends'),
            friendId,
          ),
        },
        { where: { id: currentUser.id } },
      );

      User.update(
        {
          friends: sequelize.fn(
            'array_remove',
            sequelize.col('friends'),
            currentUser.id,
          ),
        },
        { where: { id: friendId } },
      );
    }

    return {
      statusCode: 200,
      message: 'User Updated Successfully',
    };
  }

  async setBlocked(currentUserId: string, friendId: string, status: boolean) {
    const currentUser = await this.findById(currentUserId);
    const secondUser = await this.findById(friendId);

    // check if users exists
    if (!currentUser || !secondUser)
      throw new NotFoundException('User Not Found');

    if (status && currentUser.blocked && currentUser.blocked.includes(friendId))
      return {
        statusCode: 409,
        message: 'This user has already been blocked',
      };

    this.setRequest(currentUserId, friendId, false);

    if (status) {
      await this.setFriend(currentUserId, friendId, false);
      await this.setRequest(currentUserId, friendId, false);

      User.update(
        {
          blocked: sequelize.fn(
            'array_append',
            sequelize.col('blocked'),
            friendId,
          ),
        },
        {
          where: {
            id: currentUserId,
          },
        },
      );
    } else {
      User.update(
        {
          blocked: sequelize.fn(
            'array_remove',
            sequelize.col('blocked'),
            friendId,
          ),
        },
        {
          where: {
            id: currentUserId,
          },
        },
      );
    }

    return {
      statusCode: 200,
      message: 'User Updated Successfully',
    };
  }

  //Get User friends
  async getUserFriends(currentUserId: string) {
    try {
      let friends: User[] = [];
      const friendIds = (await User.findByPk(currentUserId)).friends;

      if (friendIds?.length && friendIds.length > 0) {
        for (let i = 0; i < friendIds.length; i++) {
          friends.push(await this.findById(friendIds[i]));
        }
      }

      return {
        statusCode: 200,
        friends,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 404,
        message: 'Friends Not Found',
      };
    }
  }

  //Get User Requests
  async getUserRequest(currentUserId: string) {
    try {
      let requests: User[] = [];
      const requestIds = (await User.findByPk(currentUserId)).requests;

      if (requestIds?.length && requests.length > 0) {
        for (let i = 0; i < requestIds.length; i++) {
          requests.push(await this.findById(requestIds[i]));
        }
      }

      return {
        statusCode: 200,
        requests,
      };
    } catch (error) {
      return {
        statusCode: 404,
        messgae: 'Requests Not Found',
      };
    }
  }

  //Get Blocked Users
  async getBlockedUsers(currentUserId: string) {
    try {
      const blocked: User[] = [];
      const blockedIds = (await User.findByPk(currentUserId)).blocked;

      if (blockedIds?.length && blockedIds.length > 0) {
        for (let i = 0; i < blockedIds.length; i++) {
          blocked.push(await this.findById(blockedIds[i]));
        }
      }

      return {
        statusCode: 202,
        blocked,
      };
    } catch (error) {
      return {
        statusCode: 404,
        message: 'Blocked Not Found',
      };
    }
  }
}
