import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from '../prisma.service';
import { FileService } from './file.service';

@Module({
  controllers: [BookController],
  providers: [BookService, PrismaService, FileService],
})
export class BookModule {
}
