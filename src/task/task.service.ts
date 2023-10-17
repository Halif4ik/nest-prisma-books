import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma.service';

type TTask = {
  name: string;
  id: number
}
@Injectable()
export class TaskService {
  private TASK: TTask[] = [{ id: 223, name: 'test' }];
  private id: number = 0;

  constructor(private prisma: PrismaService) {
  }
  create(createTaskDto: CreateTaskDto) {
    const temp :TTask = { id: this.id++, name: createTaskDto.name };
    this.TASK.push(temp);
    return temp;
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    console.log('id-',id);
    this.TASK[id].name = updateTaskDto.name;
    return this.TASK[id];
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
