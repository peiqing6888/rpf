import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './post.entity';

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  icon: string;

  @Column({ type: 'jsonb', default: {} })
  settings: {
    allowAnonymous?: boolean;
    requireApproval?: boolean;
    allowReplies?: boolean;
    allowReactions?: boolean;
  };

  @OneToMany(() => Post, (post) => post.board)
  posts: Post[];

  @Column({ default: 0 })
  postCount: number;

  @Column({ default: 0 })
  activeUsers: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isPrivate: boolean;

  @Column({ type: 'text', array: true, default: [] })
  moderators: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastPostAt: Date;
} 