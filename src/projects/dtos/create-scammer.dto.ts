import { IsString } from 'class-validator';

export class CreateScammerDto {
  @IsString()
  name: string;
}
