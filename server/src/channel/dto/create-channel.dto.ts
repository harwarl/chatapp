export class CreateChannelDto {
  participants: string[];
  admins?: string[];
  description: string;
  name: string;
  image: string;
}
