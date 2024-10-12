export interface IUser {
  id: string;
  username: string;
  email?: string;
  image?: string;
  about?: string;
  friends?: string[];
  blocked?: string[];
  requests?: string[];
}

export interface UpdateUserDto {
  username?: string;
  about?: string;
}
