import { Sequelize } from 'sequelize-typescript';
import { Channel } from 'src/channel/entities/channel.entity';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () =>{
      console.log(process.env.DB_PASSWORD)
      const sequelize = new Sequelize({
        dialect: "postgres",
        host: "localhost",
        port: 5432,
        username: 'postgres',
        password: "root",
        database: "chat_db"
      });
      sequelize.addModels([User, Message, Channel]);
      await sequelize.sync();
      return sequelize;
    }
  }
];