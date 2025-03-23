import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class userCreateDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail(undefined)
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
