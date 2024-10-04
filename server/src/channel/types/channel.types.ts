import { Socket } from 'socket.io';
import { User } from 'src/user/entities/user.entity';

export interface ISocket extends Socket {
  user?: User;
}
