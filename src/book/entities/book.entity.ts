import { ApiProperty } from '@nestjs/swagger';
import { GeneralResponse } from "../interface/generalResponse.interface";
import { IBook } from "../interface/customResponces";
import {Book} from '@prisma/client';

export class BookClass implements GeneralResponse<IBook> {
    @ApiProperty({ example: 200 })
    status_code: number;

    @ApiProperty({
        example: {
            'book': {
                id: 1,
                bookName: 'Example Book',
                describeBook: 'This is an example book',
                image: 'example.jpg',
                authorId: 1,
                userId: 1,
                createdAt: new Date(),
            },
        },
    })
    detail: {
        book: Book;
    };

    @ApiProperty({ example: 'created' })
    result: string;
}
