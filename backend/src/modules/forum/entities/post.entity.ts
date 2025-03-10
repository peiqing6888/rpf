import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Board } from './board.entity';
import { Reaction } from './reaction.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column()
  authorId: string;

  @ManyToOne(() => Board, (board) => board.posts)
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @Column()
  boardId: string;

  @OneToMany(() => Post, (post) => post.parent)
  replies: Post[];

  @ManyToOne(() => Post, (post) => post.replies, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: Post;

  @Column({ nullable: true })
  parentId: string;

  @OneToMany(() => Reaction, (reaction) => reaction.post)
  reactions: Reaction[];

  @Column({ type: 'jsonb', default: {} })
  reactionCounts: {
    [key: string]: number;
  };

  @Column({ default: 0 })
  replyCount: number;

  @Column({ default: false })
  isPinned: boolean;

  @Column({ default: false })
  isLocked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastReplyAt: Date;
} 