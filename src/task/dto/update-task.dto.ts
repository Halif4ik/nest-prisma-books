import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {

  @ApiProperty({example:'123456', description:'pass max len 50 chars'})
  @IsInt({message: 'It should be Integer'})
  readonly id:number;

  @ApiProperty({example:'123456', description:'pass max len 50 chars'})
  @IsString({message: 'It should be Integer'})
  readonly text:string;
}
