import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export  class CreateUserDto{

  @ApiProperty({example:'exmpl@mail.com', description:'E-mail'})
  @IsEmail({},{message: 'E-mail, should be string'})
  readonly email:string;

  @ApiProperty({example:'123456', description:'pass max len 50 chars'})
  @IsString({message: 'It should be string'})
  @Length(4, 10,{ message:'Min lenth 4 max length 10'})
  readonly password:string;
}