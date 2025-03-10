import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { UsersModule } from './modules/users/users.module';
import { ForumModule } from './modules/forum/forum.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    // 環境配置
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // PostgreSQL配置 (Supabase)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DIRECT_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') !== 'production',
        ssl: {
          rejectUnauthorized: false
        },
        extra: {
          max: 20,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000,
        }
      }),
      inject: [ConfigService],
    }),

    // Redis配置
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        config: {
          url: configService.get('REDIS_URL'),
          tls: configService.get('NODE_ENV') === 'production' ? {} : false,
        },
      }),
      inject: [ConfigService],
    }),

    // 功能模塊
    UsersModule,
    ForumModule,
    AuthModule,
  ],
})
export class AppModule {} 