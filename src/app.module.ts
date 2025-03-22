import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [UserModule, SessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
