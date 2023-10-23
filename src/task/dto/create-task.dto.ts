import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNumber, IsString, Length } from 'class-validator';
export class CreateTaskDto {

  @ApiProperty({ example: 'Dima', description: 'Name current user' })
 /* @IsEmail({},{message: 'E-mail, should be string'})*/
  @IsString({ message: 'should be string' })
  readonly name: string;

  @IsString({ message: 'should be string' })
  @Length(4, 10, { message: 'Min lenth 4 max length 10' })
  @ApiProperty({ example: 'exp.png', description: 'Image' })
  readonly image: string;

}