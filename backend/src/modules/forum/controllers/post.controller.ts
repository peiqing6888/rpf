import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { CreateReplyDto } from '../dto/create-reply.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { User } from '../../users/entities/user.entity';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(@Query('boardId') boardId: string) {
    return this.postService.findAll(boardId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User,
  ) {
    return this.postService.create(createPostDto, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @CurrentUser() user: User,
  ) {
    return this.postService.update(id, updatePostDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    return this.postService.remove(id, user);
  }

  @Post(':id/replies')
  @UseGuards(AuthGuard)
  async createReply(
    @Param('id') postId: string,
    @Body() createReplyDto: CreateReplyDto,
    @CurrentUser() user: User,
  ) {
    return this.postService.createReply(postId, createReplyDto, user);
  }

  @Get(':id/replies')
  async getReplies(@Param('id') postId: string) {
    return this.postService.getReplies(postId);
  }

  @Post(':id/reactions/:type')
  @UseGuards(AuthGuard)
  async toggleReaction(
    @Param('id') postId: string,
    @Param('type') type: string,
    @CurrentUser() user: User,
  ) {
    return this.postService.toggleReaction(postId, type, user);
  }
} 