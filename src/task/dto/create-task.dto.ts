import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNumber, IsString, Length } from 'class-validator';

export  class CreateTaskDto{

  @ApiProperty({example:'Dima', description:'E-mail'})
  @IsString({message: 'should be string'})
  @Length(4, 10,{ message:'Min lenth 4 max length 10'})
  readonly name:string;


}