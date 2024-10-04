import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  tableName: 'channels',
})
export class Channel extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4())
  @Column(DataType.UUID)
  public id: string;

  @Column(DataType.ARRAY(DataType.UUID))
  public participants: string[];

  @Default('Chat Room') //Could be a group
  @Column(DataType.STRING)
  public channelType: string;

  @Default([])
  @Column(DataType.ARRAY(DataType.UUID))
  public admins: string[];

  @Default(null)
  @Column(DataType.STRING)
  public description: string;

  @Default([])
  @Column(DataType.ARRAY(DataType.UUID))
  public messages: string[];

  @Column(DataType.STRING(50))
  public name: string;

  @Default(
    'https://res.cloudinary.com/dhi3unz48/image/upload/f_auto,q_auto/rrxdozrqznga8opobkjj',
  )
  @Column(DataType.STRING)
  public image: string;
}
