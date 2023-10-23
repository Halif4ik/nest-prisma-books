import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

  @ApiProperty({example:'1', description:'Integer'})
  @IsInt({message: 'It should be Integer'})
  readonly id:number;

  @ApiProperty({example:'some text', description:'pass max len 50 chars'})
  @IsString({message: 'It should be String'})
  readonly text:string;
}
