import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail(undefined)
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
