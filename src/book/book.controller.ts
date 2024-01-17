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
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import {Express} from 'express';
import {BookClass} from './entities/book.entity';
import * as process from 'process';
import {GeneralResponse} from "./interface/generalResponse.interface";
import {IBook} from "./interface/customResponces";
import {PaginationBookDto} from "./dto/pagination-book.dto";


@ApiTags('CRUD books')
@Controller('api/books')
export class BookController {
    constructor(private readonly bookService: BookService) {
    }

    //1.All Users can create new books for table if they are available or will create temp user-owner
    //Endpoint: Post /api/books
    @Post()
    @ApiResponse({status: 200, type: BookClass})
    @ApiOperation({summary: 'Created Book in database'})
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

    //2.All Users can get books
    //Endpoint: Get /api/books?page=1&revert=false&limit=2&start=2
    @Get()
    @ApiResponse({status: 200, type: BookClass})
    @ApiOperation({summary: 'Get  all Books from database'})
    @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
    async findAll(@Query() paginationBookDto: PaginationBookDto): Promise<GeneralResponse<any>> {
        return this.bookService.findAll(paginationBookDto);
    }
}
