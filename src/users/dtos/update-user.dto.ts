import { IsString, IsEmail, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;


  @IsString()
  //@MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  is_admin?: boolean;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
