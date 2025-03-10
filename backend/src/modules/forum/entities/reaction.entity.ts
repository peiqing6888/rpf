import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity('reactions')
@Unique(['userId', 'postId', 'type'])
export class Reaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne('User', 'reactions')
  @JoinColumn({ name: 'userId' })
  user!: any;

  @Column()
  userId!: string;

  @ManyToOne('Post', 'reactions')
  @JoinColumn({ name: 'postId' })
  post!: any;

  @Column()
  postId!: string;

  @Column()
  type!: string;

  @CreateDateColumn()
  createdAt!: Date;
} 