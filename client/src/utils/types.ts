export type signInFormType = {
  email: string;
  username?: string;
  password: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  image: string;
  about: string;
  friends: string[] | null;
  requests: string[] | null;
  blocked: string[] | null;
};

export type Channel = {
  id: string;
  participants: User[];
  messages: Message[];
  name?: string;
  description?: string;
  image?: string;
  admins?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Message = {
  id: string;
  userId: string;
  user?: User;
  text?: string;
  images?: string[];
  createdAt: Date;
};
