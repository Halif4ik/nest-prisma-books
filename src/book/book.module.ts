import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from '../prisma.service';
import { FileService } from './file.service';
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [BookController],
  providers: [BookService, PrismaService, FileService,],
  imports: [UsersModule],
})
export class BookModule {
}
