import { IsString, IsOptional, IsObject } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  nameplate?: string;

  @IsObject()
  @IsOptional()
  preferences?: {
    theme?: string;
    notifications?: boolean;
    language?: string;
  };
} 