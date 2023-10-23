import { Module } from '@nestjs/common';
import { FileService, TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService,PrismaService,FileService],
})
export class TaskModule {}
