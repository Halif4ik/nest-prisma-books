import {
    Controller,
    Get,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
    Query, UsePipes, ValidationPipe, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator,
} from '@nestjs/common';
import {BookService} from './book.service';
import {CreateBookDto} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import {Express} from 'express';
import {BookClass} from './entities/book.entity';
import * as process from 'process';
import {Book} from '@prisma/client';
import {GeneralResponse} from "./interface/generalResponse.interface";
import {IBook} from "./interface/customResponces";

@ApiTags('CRUD books')
@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) {
    }

    //1.All Users can create new books for table if they are available or
    @Post()
    @ApiResponse({status: 200, type: BookClass})
    @ApiOperation({summary: 'Created Task'})
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    async create(@Body() createBookDto: CreateBookDto, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({
                    maxSize: 1024 * +process.env.MAX_FILE_SIZE_KB,
                }),
                new FileTypeValidator({fileType: 'image/jpeg'}),
            ],
        }),
    ) file: Express.Multer.File): Promise<GeneralResponse<IBook>> {
        return await this.bookService.create(createBookDto, [file]);
    }

    @Get()
    async findAll(@Query() query: { page: number, revert: string, limit: number, start: number }) {
        const {page, revert, limit, start} = query;
        return this.bookService.findAll(page, revert);
    }
}
