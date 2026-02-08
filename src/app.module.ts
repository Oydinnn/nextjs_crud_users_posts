import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { PostModule } from './modules/posts/post.module';

@Module({
  imports: [UserModule, PostModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
