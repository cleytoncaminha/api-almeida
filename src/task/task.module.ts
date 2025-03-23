import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { PrismaService } from '../prisma/prisma.service';
import { TaskController } from './task.controller';

@Module({
  providers: [TaskService, PrismaService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
