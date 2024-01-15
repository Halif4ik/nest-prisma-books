import { Module } from '@nestjs/common';
import { FileService } from './book/file.service';
import { PrismaService } from './prisma.service';
import { BookModule } from './book/book.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import * as path from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../public'),
    }),
    BookModule,
    UsersModule],
  providers: [PrismaService, FileService],
})
export class AppModule {
}
