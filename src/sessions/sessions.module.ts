import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { PrismaService } from '../prisma/prisma.service'; // Se já estiver configurado

@Module({
  controllers: [SessionsController],
  providers: [SessionsService, PrismaService], // Adiciona o PrismaService
})
export class SessionsModule {}
