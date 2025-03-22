import { Controller, Post, Get, Body } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.createSession(createSessionDto);
  }

  @Get()
  async findAll() {
    return this.sessionsService.getSessions();
  }
}
