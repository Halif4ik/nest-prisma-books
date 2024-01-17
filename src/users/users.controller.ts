import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {
  }

  @UsePipes(ValidationPipe)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Body() userDto: CreateUserDto,@UploadedFile() file: Express.Multer.File) {
    console.log('!!!file-',file);
  }



}
