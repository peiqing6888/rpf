import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Board } from './entities/board.entity';
import { Reaction } from './entities/reaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Board, Reaction]),
  ],
  exports: [TypeOrmModule],
})
export class ForumModule {} 