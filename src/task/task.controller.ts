import {
  Body,
  Controller,
  Delete, FileTypeValidator,
  Get, HttpCode, MaxFileSizeValidator,
  Param, ParseFilePipe,
  Patch,
  Post, Query,
  UploadedFile, UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileElementResponse, TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

class TaskClass {
  @ApiProperty({ example: '1', description: 'Unique id from 1' })
  id: number;
  @ApiProperty({ example: 'bad medicine', description: 'Some name' })
  name: string;
  @ApiProperty({ example: 'true', description: 'published or not' })
  published: boolean;
}

@ApiTags('CRUD tasks')
@Controller('tasks')
export class TaskController {
  private readonly taskService: TaskService;

  constructor(options: TaskService) {
    this.taskService = options;
  }

  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Created Task' })
  @HttpCode(200)
  @ApiResponse({ status: 200, type: TaskClass })
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@Body() createTaskDto: CreateTaskDto, @UploadedFile(    /*new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 10000 }),
        new FileTypeValidator({ fileType: 'image/jpeg' }),
      ],
    })*/
  ) file: Express.Multer.File) {
    return this.taskService.saveFile(createTaskDto, [file]);
  }

  @Get()
  async findAll(@Query() query: { page: number, revert: string }) {
    const {page, revert}: { page: number; revert: string } = query;
    return this.taskService.findAll(page, revert);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
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
