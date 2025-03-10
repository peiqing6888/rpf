import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async findAll(): Promise<Board[]> {
    return this.boardRepository.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id, isActive: true },
      relations: ['posts'],
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    return board;
  }

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.boardRepository.create({
      ...createBoardDto,
      settings: {
        allowAnonymous: createBoardDto.allowAnonymous ?? false,
        requireApproval: createBoardDto.requireApproval ?? false,
        allowReplies: createBoardDto.allowReplies ?? true,
        allowReactions: createBoardDto.allowReactions ?? true,
      },
    });
    return this.boardRepository.save(board);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const board = await this.findOne(id);
    
    // 更新基本信息
    Object.assign(board, updateBoardDto);
    
    // 更新設置
    if (updateBoardDto.allowAnonymous !== undefined ||
        updateBoardDto.requireApproval !== undefined ||
        updateBoardDto.allowReplies !== undefined ||
        updateBoardDto.allowReactions !== undefined) {
      board.settings = {
        ...board.settings,
        allowAnonymous: updateBoardDto.allowAnonymous ?? board.settings.allowAnonymous,
        requireApproval: updateBoardDto.requireApproval ?? board.settings.requireApproval,
        allowReplies: updateBoardDto.allowReplies ?? board.settings.allowReplies,
        allowReactions: updateBoardDto.allowReactions ?? board.settings.allowReactions,
      };
    }

    return this.boardRepository.save(board);
  }

  async remove(id: string): Promise<void> {
    const board = await this.findOne(id);
    board.isActive = false;
    await this.boardRepository.save(board);
  }

  async incrementPostCount(id: string): Promise<void> {
    await this.boardRepository.increment({ id }, 'postCount', 1);
  }

  async updateActiveUsers(id: string, count: number): Promise<void> {
    await this.boardRepository.update(id, { activeUsers: count });
  }
} 