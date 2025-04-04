import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';


@Module({
  imports: [PostModule, PrismaModule, UserModule, AuthModule],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}
