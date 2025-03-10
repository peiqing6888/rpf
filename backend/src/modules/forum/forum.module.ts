import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Board } from './entities/board.entity';
import { Reaction } from './entities/reaction.entity';
import { BoardController } from './controllers/board.controller';
import { PostController } from './controllers/post.controller';
import { BoardService } from './services/board.service';
import { PostService } from './services/post.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Board, Reaction]),
    UsersModule,
  ],
  controllers: [BoardController, PostController],
  providers: [BoardService, PostService],
  exports: [TypeOrmModule, BoardService, PostService],
})
export class ForumModule {} 