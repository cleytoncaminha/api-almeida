import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(createSessionDto: CreateSessionDto) {
    return this.prisma.events.create({
      data: createSessionDto,
    });
  }

  async getSessions() {
    return this.prisma.events.findMany();
  }
}
