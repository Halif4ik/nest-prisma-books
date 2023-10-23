import { Module } from '@nestjs/common';
import { FileService } from './book/file.service';
import { PrismaService } from './prisma.service';
import { BookModule } from './book/book.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as path from 'node:path';
import { BookService } from './book/book.service';
import { BookController } from './book/book.controller';
@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: path.join(__dirname, '../public'),
  }), BookModule, UsersModule],
  controllers: [BookController],
  providers: [BookService, PrismaService,FileService],
})
export class AppModule {}
