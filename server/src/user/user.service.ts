import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  //Find User by Username
  async findByUsername (username: string):Promise<User | undefined> {
    const user = await User.findOne({ where: { username: username }});
    return user;
  } 

  //Find User by Email
  async findByEmail (email: string): Promise<User | undefined> {
    const user = await User.findOne({ where: { email: email }});
    return user;
  }

  //Find User by Id
  async findById(id: string): Promise<User | undefined > {
    const user = await User.findByPk(id, { attributes: { exclude: ['password']}});
    return user;
  }

  //FInd Users By Search
  async findBySearch(searchTerm: string) : Promise<any> {
    const user = await User.findAll({ where: {
      username: {
        [Op.iLike]: `${searchTerm}%`
      }
    }})

    return user;
  }

  //Create User
  async createUser(createUserDto: CreateUserDto): Promise<User | undefined > {
    const user = await User.create({
      email: createUserDto.email,
      username: createUserDto.username,
      password: createUserDto.password
    });

    return user
  }
}
