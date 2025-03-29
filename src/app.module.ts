import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [PostModule, PrismaModule],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}
