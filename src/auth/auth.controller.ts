import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthDto } from './dto/auth.dto';
import { userCreateDTO } from './dto/user-create.dto';
import { HashPasswordPipe } from '../common/pipes/hash-password.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() { email, password }: AuthDto) {
    return this.authService.login(email, password);
  }

  @Post('create-user')
  async userCreate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() { password, ...userData }: userCreateDTO,
    @Body('password', HashPasswordPipe) hashPassword: string,
  ) {
    await this.authService.createUser({
      ...userData,
      password: hashPassword,
    });
  }
}
