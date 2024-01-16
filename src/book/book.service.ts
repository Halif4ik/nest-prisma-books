import {Body, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {CreateBookDto} from './dto/create-book.dto';
import {PrismaService} from '../prisma.service';
import {FileService, FileElementResponse} from './file.service';
import {Author, Book, User} from '@prisma/client';
import {GeneralResponse} from './interface/generalResponse.interface';
import {IBook} from './interface/customResponces';
import {UsersService} from "../users/users.service";

const PAGE_PAGINATION: number = process.env.PAGE_PAGINATION ? parseInt(process.env.PAGE_PAGINATION) : 5;

@Injectable()
export class BookService {
    private readonly logger: Logger = new Logger(BookService.name);

    constructor(private fileService: FileService,private userService: UsersService,
                private prisma: PrismaService) {
    }

    async create(@Body() createBookDto: CreateBookDto, images: Express.Multer.File[]): Promise<GeneralResponse<IBook>> {
        const author: Author = await this.findOrCreateAuthor(createBookDto.author);
        const user:User = await this.findOrCreateUser();
        const fileSaved: FileElementResponse = await this.fileService.createFile(images);
        const newBook: Book = await this.prisma.book.create({
            data: {
                bookName: createBookDto.name,
                describeBook: createBookDto.text,
                image: fileSaved.name,
                authorId: author.id,
                userId: user.id,
            },
        });

        this.logger.log(`Created new book- ${newBook.bookName}`);
        return {
            'status_code': HttpStatus.OK,
            'detail': {
                'book': newBook,
            },
            'result': 'created',
        };
    }

    private async findOrCreateAuthor(author: string): Promise<Author> {
        return this.prisma.author.upsert({
            where: {
                name: author,
            },
            create: {
                name: author,
            },
            update: {},
        });
    }

    async findAll(page: number, revert: string) {
        const books = await this.prisma.book.findMany();
        const amountAll: number = await this.prisma.book.count();

        return {
            items: books,
            loginOfCurrentUser: 'loginOfCurrentUser',
            '_csrf': 'tokenSentToFront',
            amountPage: Math.ceil(amountAll / PAGE_PAGINATION) || 1,
        };
    }

    private async findOrCreateUser(): Promise<User> {
        return this.userService.createUser();
    }
}
