import { IsNotEmpty } from 'class-validator';

export class validateCodeDto {
  @IsNotEmpty()
  token: string;
}
