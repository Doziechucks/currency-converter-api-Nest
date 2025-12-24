import { IsNotEmpty, IsString } from 'class-validator';

export class RateDto {
  @IsString()
  @IsNotEmpty()
  from_currency: string;

  @IsString()
  @IsNotEmpty()
  to_currency: string;
}
