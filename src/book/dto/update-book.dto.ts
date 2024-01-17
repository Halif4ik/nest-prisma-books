import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';
import { IsString, Length } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({ example: 'Java', description: 'Name current book' })
  @Length(1, 255, { message: 'Min lenth 1 max length 255' })
  @IsString({ message: 'Name should be string' })
  readonly name?: string;

  @ApiProperty({ example: 'This is very interesting book', description: 'Description book' })
  @Length(1, 255, { message: 'Min lenth 1 max length 255' })
  @IsString({ message: 'description should be string' })
  readonly text?: string;

  @ApiProperty({ example: 'Jon Dou', description: 'Author name' })
  @Length(1, 255, { message: 'Min lenth 1 max length 255' })
  @IsString({ message: 'Author name should be string' })
  readonly author?: string;

  @ApiProperty({ example: 'exp.png', description: 'Image' })
  @Length(5, 255, { message: 'Min lenth 5 max length 255' })
  readonly image?: string;
}
