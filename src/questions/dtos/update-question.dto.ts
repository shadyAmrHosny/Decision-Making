import { IsString, IsOptional, IsNumber, IsBoolean,  Min } from 'class-validator';

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  question?: string;

  // @IsOptional()
  // @IsNumber()
  // parent?: number | null;

  @IsOptional()
  @IsBoolean()
  parent_answer_condition?: boolean | null;

  @IsOptional()
  @IsNumber()
  @Min(0)
  true_rate?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  false_rate?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
