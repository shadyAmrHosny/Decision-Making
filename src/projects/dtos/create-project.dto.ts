import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateProjectDto{
  @IsString()
  @IsNotEmpty()
  client_name: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  from_language: string;

  @IsString()
  to_language: string;


}