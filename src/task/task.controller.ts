import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guards/auth-jwt.guard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Body('title') title: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('email') email?: string,
    @Body('product') product?: string,
  ): Promise<Task> {
    return this.taskService.createTask(title, phoneNumber, email, product);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get('code/:code')
  async getTaskByCode(@Param('code') code: string): Promise<Task> {
    return this.taskService.getTaskByCode(code);
  }
}
