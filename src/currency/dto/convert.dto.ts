import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConvertDto {
  @IsString()
  @IsNotEmpty()
  current_currency: string;

  @IsString()
  @IsNotEmpty()
  new_currency: string;

  @IsNumber()
  amount: number;
}
