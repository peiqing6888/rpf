import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { Board } from '../entities/board.entity';
import { Reaction } from '../entities/reaction.entity';
import { User } from '../../users/entities/user.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { CreateReplyDto } from '../dto/create-reply.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
  ) {}

  async findAll(boardId: string): Promise<Post[]> {
    return this.postRepository.find({
      where: { boardId },
      relations: ['author', 'reactions'],
      order: { isPinned: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'reactions', 'board'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async create(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const board = await this.boardRepository.findOne({
      where: { id: createPostDto.boardId },
    });

    if (!board) {
      throw new NotFoundException(`Board not found`);
    }

    const post = this.postRepository.create({
      ...createPostDto,
      author: user,
      board,
    });

    await this.boardRepository.increment(
      { id: board.id },
      'postCount',
      1,
    );

    return this.postRepository.save(post);
  }

  async update(id: string, updatePostDto: UpdatePostDto, user: User): Promise<Post> {
    const post = await this.findOne(id);

    if (post.author.id !== user.id) {
      throw new ForbiddenException('You can only edit your own posts');
    }

    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async remove(id: string, user: User): Promise<void> {
    const post = await this.findOne(id);

    if (post.author.id !== user.id) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    await this.postRepository.remove(post);
  }

  async createReply(postId: string, createReplyDto: CreateReplyDto, user: User): Promise<Post> {
    const parentPost = await this.findOne(postId);

    const reply = this.postRepository.create({
      content: createReplyDto.content,
      author: user,
      board: parentPost.board,
      parent: parentPost,
      title: `Re: ${parentPost.title}`,
    });

    await this.postRepository.increment(
      { id: postId },
      'replyCount',
      1,
    );

    return this.postRepository.save(reply);
  }

  async getReplies(postId: string): Promise<Post[]> {
    return this.postRepository.find({
      where: { parentId: postId },
      relations: ['author', 'reactions'],
      order: { createdAt: 'ASC' },
    });
  }

  async toggleReaction(postId: string, type: string, user: User): Promise<void> {
    const post = await this.findOne(postId);

    const existingReaction = await this.reactionRepository.findOne({
      where: {
        postId,
        userId: user.id,
        type,
      },
    });

    if (existingReaction) {
      await this.reactionRepository.remove(existingReaction);
      await this.postRepository.decrement(
        { id: postId },
        `reactionCounts.${type}`,
        1,
      );
    } else {
      const reaction = this.reactionRepository.create({
        post,
        user,
        type,
      });
      await this.reactionRepository.save(reaction);
      await this.postRepository.increment(
        { id: postId },
        `reactionCounts.${type}`,
        1,
      );
    }
  }
} 