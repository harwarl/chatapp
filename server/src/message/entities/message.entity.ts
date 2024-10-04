import { Model } from 'sequelize-typescript';
import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Channel } from 'src/channel/entities/channel.entity';
import { User } from 'src/user/entities/user.entity';

@Table({ timestamps: true, tableName: 'messages' })
export class Message extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4())
  @Column(DataType.UUID)
  public id: string;

  @ForeignKey(() => Channel)
  @Column(DataType.UUID)
  public channelId: string;

  @BelongsTo(() => Channel)
  public channel: Channel;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  public userId: string;

  @BelongsTo(() => User)
  public user: User;

  @Column(DataType.STRING)
  public text: string;

  @Column(DataType.ARRAY(DataType.STRING))
  public images: string[];
}
