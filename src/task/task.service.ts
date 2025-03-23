import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { randomInt } from 'crypto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(
    title: string,
    phoneNumber: string,
    email?: string,
    product?: string,
  ): Promise<Task> {
    let taskCode = this.generateTaskCode();

    while (await this.isCodeExists(taskCode)) {
      taskCode = this.generateTaskCode();
    }

    return this.prisma.task.create({
      data: {
        title,
        phoneNumber,
        email,
        product,
        code: taskCode,
      },
    });
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Servico nao encontrado');
    }

    return task;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  private generateTaskCode(): string {
    const digits = randomInt(1000, 9999).toString();
    const letters = this.randomString(3);
    return digits + letters;
  }

  private randomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(randomInt(0, characters.length));
    }
    return result;
  }

  private async isCodeExists(code: string): Promise<boolean> {
    const existingTask = await this.prisma.task.findUnique({
      where: { code },
    });
    return existingTask !== null;
  }

  async getTaskByCode(code: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { code },
    });

    if (!task) {
      throw new NotFoundException('Task with the given code not found');
    }

    return task;
  }
}
