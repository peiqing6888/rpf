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

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @ManyToOne('User', 'posts')
  @JoinColumn({ name: 'authorId' })
  author!: any;

  @Column()
  authorId!: string;

  @ManyToOne('Board', 'posts')
  @JoinColumn({ name: 'boardId' })
  board!: any;

  @Column()
  boardId!: string;

  @OneToMany('Post', 'parent')
  replies!: Post[];

  @ManyToOne('Post', 'replies', { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent!: Post;

  @Column({ nullable: true })
  parentId!: string;

  @OneToMany('Reaction', 'post')
  reactions!: any[];

  @Column({ type: 'jsonb', default: {} })
  reactionCounts!: {
    [key: string]: number;
  };

  @Column({ default: 0 })
  replyCount!: number;

  @Column({ default: false })
  isPinned!: boolean;

  @Column({ default: false })
  isLocked!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  lastReplyAt!: Date;
} 