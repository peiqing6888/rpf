import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
  ],
  providers: [
    AuthGuard,
    RolesGuard,
  ],
  exports: [
    AuthGuard,
    RolesGuard,
  ],
})
export class AuthModule {} 