import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  private readonly taskService: TaskService;

  constructor(options: TaskService) {
    this.taskService = options;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    console.log('CreateTaskDto.name-',createTaskDto.name);
    return this.taskService.create(createTaskDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    console.log('Updat id -',updateTaskDto.id);
    return this.taskService.update(+id, updateTaskDto);
  }

  @Get()
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
