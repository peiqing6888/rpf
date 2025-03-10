import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  username!: string;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true })
  avatar!: string;

  @Column({ default: 'New Member' })
  nameplate!: string;

  @Column({ type: 'jsonb', default: {} })
  preferences!: {
    theme?: string;
    notifications?: boolean;
    language?: string;
  };

  @OneToMany('Post', 'author')
  posts!: any[];

  @OneToMany('Reaction', 'user')
  reactions!: any[];

  @Column({ default: 0 })
  postCount!: number;

  @Column({ default: 0 })
  reactionCount!: number;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isVerified!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ nullable: true })
  lastLoginAt!: Date;
} 