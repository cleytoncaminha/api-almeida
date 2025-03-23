import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'], // Habilitar logs para as consultas
    });
  }
  async onModuleInit() {
    await this.$connect();
    console.log('Prisma connected to database.');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
