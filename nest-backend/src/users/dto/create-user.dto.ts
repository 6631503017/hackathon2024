import { IsString, IsEmail, IsNotEmpty, IsOptional, IsArray, IsEnum, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  owned?: Types.ObjectId[];

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  favorites?: Types.ObjectId[];

  @IsEnum([0, 1, 2])
  @IsOptional()
  tier?: number;

  @IsString()
  @IsOptional()
  picture?: string;
}