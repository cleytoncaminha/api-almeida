import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { userCreateDTO } from '../dto/user-create.dto';

export interface UserPayload {
  userId: string;
  userName: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    const authUser = await bcrypt.compare(password, user.password);

    if (!authUser) {
      throw new UnauthorizedException('nao autorizado');
    }

    const payload: UserPayload = {
      userId: user.id,
      userName: user.name,
    };

    return {
      token_access: await this.jwtService.signAsync(payload, {
        expiresIn: '24h',
      }),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async createUser(createUserDto: userCreateDTO) {
    const { ...userData } = createUserDto;
    const existingUser = await this.prisma.user.findFirst({ where: { email: userData.email } });

    if (existingUser) {
      throw new Error('usuario ja existe');
    }

    const user = await this.prisma.user.create({ data: userData });

    return this.prisma.user.findFirst({
      where: { id: user.id },
    });
  }

  async validateUserByJwt(payload: UserPayload) {
    return this.prisma.user.findUnique({ where: { id: payload.userId } });
  }
}
