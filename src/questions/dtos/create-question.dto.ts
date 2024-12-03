import { IsString, IsOptional, IsNumber, IsBoolean, Min,IsInt } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  question: string;

  @IsOptional()
  @IsNumber()
  parent_id: number | null;

  @IsOptional()
  @IsBoolean()
  parent_answer_condition: boolean | null;

  @IsNumber()
  @Min(0)
  true_rate: number;

  @IsNumber()
  @Min(0)
  false_rate: number;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  // @IsInt()
  // created_by: number;  // temporary am going to implement current user decorator later to handle this
}
