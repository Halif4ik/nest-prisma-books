import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'Java', description: 'Name current book' })
  @Length(2, 255, { message: 'Min lenth 2 max length 255' })
  @IsString({ message: 'Name should be string' })
  readonly name: string;

  @ApiProperty({ example: 'This is very interesting book', description: 'Description book' })
  @Length(3, 255, { message: 'Min lenth 3 max length 255' })
  @IsString({ message: 'description should be string' })
  readonly text: string;

  @ApiProperty({ example: 'Jon Dou', description: 'Author name' })
  @Length(4, 255, { message: 'Min lenth 4 max length 255' })
  @IsString({ message: 'Author name should be string' })
  readonly author: string;

  @ApiProperty({ example: 'exp.png', description: 'Image' })
  @IsOptional()
  readonly image: string;

}
