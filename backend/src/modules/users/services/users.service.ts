import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Post } from '../../forum/entities/post.entity';
import { Reaction } from '../../forum/entities/reaction.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: [
        'id',
        'email',
        'username',
        'avatar',
        'nameplate',
        'preferences',
        'postCount',
        'reactionCount',
        'isActive',
        'isVerified',
        'createdAt',
        'lastLoginAt',
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async findUserPosts(userId: string): Promise<Post[]> {
    return this.postRepository.find({
      where: { authorId: userId },
      relations: ['board', 'reactions'],
      order: { createdAt: 'DESC' },
    });
  }

  async findUserReactions(userId: string): Promise<Reaction[]> {
    return this.reactionRepository.find({
      where: { userId },
      relations: ['post'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.userRepository.update(id, {
      lastLoginAt: new Date(),
    });
  }

  async incrementPostCount(id: string): Promise<void> {
    await this.userRepository.increment({ id }, 'postCount', 1);
  }

  async incrementReactionCount(id: string): Promise<void> {
    await this.userRepository.increment({ id }, 'reactionCount', 1);
  }

  async decrementReactionCount(id: string): Promise<void> {
    await this.userRepository.decrement({ id }, 'reactionCount', 1);
  }
} 