import { Body, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';
import { ensureDir, writeFile } from 'fs-extra';
const PAGE_PAGINATION: number = process.env.PAGE_PAGINATION ? parseInt(process.env.PAGE_PAGINATION) : 5;
export class FileElementResponse {
  url: string;
  name: string;
}

export class FileService {
  async createFile(files: Express.Multer.File[]): Promise<FileElementResponse> {
    try {
      const filePath: string = path.join(__dirname, '../../public/upload');
      await ensureDir(filePath);
      let resp: FileElementResponse = null;
      if (files) {
        const fileName: string = `${Date.now()}-${files[0].originalname}`;
        await writeFile(path.join(filePath, fileName), files[0].buffer);
        resp = ({ url: `${filePath}/${fileName}`, name: fileName });
      }
      return resp;
    } catch (e) {
      throw new HttpException('Error write file on disk', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

@Injectable()
export class TaskService {
  private prisma: PrismaService;

  constructor(private fileService: FileService, options: PrismaService) {
    this.prisma = options;
  }

  async create(createTaskDto: CreateTaskDto) {
    const fileName = 'await this.fileService.createFile(image)';
    const newTask = await this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        published: true,
        image: fileName,
      },
    });
    console.log('newTask-', newTask);
    return newTask;
  }

  async saveFile(@Body() createTaskDto: CreateTaskDto, images: Express.Multer.File[]) {
    const fileName: FileElementResponse = await this.fileService.createFile(images);
    console.log('fileName-', fileName);
    console.log('obj-', {
      data: {
        name: createTaskDto.name,
        published: true,
        image: fileName.name,
      },
    });
    const newTask = await this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        published: true,
        image: fileName.name,
      },
    });
    console.log('fileName-', fileName);
    console.log('newTask-', newTask);
    return newTask;
  }

  async findAll(page: number, revert: string) {
    const books = await this.prisma.task.findMany();
    const amountAll: number = await this.prisma.task.count();

    return {
      items: books,
      loginOfCurrentUser: 'loginOfCurrentUser',
      '_csrf': 'tokenSentToFront',
      amountPage: Math.ceil(amountAll / PAGE_PAGINATION) || 1
    }
  }

  async findOne(id: number) {
    console.log('findOne id-', id);
    const temp = await this.prisma.task.findUnique({ where: { id: id } });
    console.log('findOne temp-', temp);
    if (!temp) throw new NotFoundException('Taska didnt find');
    return temp;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const user = await this.prisma.task.update({
      data: {
        name: updateTaskDto.name,
      },
      where: {
        id: id,
      },
    });
    console.log('updateid -', user);
    if (!user) throw new NotFoundException('Taska for update didnt find');
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
