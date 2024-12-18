import { IsString, IsOptional, IsNumber, IsBoolean, Min, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuestionTreeDto {
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionTreeDto)
  children?: CreateQuestionTreeDto[];
}
