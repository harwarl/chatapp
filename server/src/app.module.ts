import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule} from '@nestjs/config';
import { ChannelModule } from './channel/channel.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    AuthModule, 
    UserModule, 
    ChannelModule,
    MessageModule, 
    ConfigModule.forRoot({
    envFilePath: '.env'
  }),],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
