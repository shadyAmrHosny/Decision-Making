import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateDecisionDto{
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  decision_name: string;

  @IsNumber({maxDecimalPlaces: 2})
  decision_rate: number;

}