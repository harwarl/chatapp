export class CreateMessageDto {
  text: string;
  images: string[];
  channelId: string;
  userId?: string;
}
