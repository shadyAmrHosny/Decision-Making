import { IsString, IsEmail, IsBoolean, IsOptional, MinLength,IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()

    //@MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsBoolean()
  @IsOptional()
  is_admin?: boolean;

}
