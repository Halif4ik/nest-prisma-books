import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {
  }

  async login(userDto: CreateUserDto) {
    console.log("login-", userDto);
    const userFromBd = await this.userService.getUserByEmail(userDto.email);
   /* if (!userFromBd) throw new UnauthorizedException({ message: "Incorect E-mail" });*/

    const passwordCompare = await bcrypt.compare("userDto.password"," userFromBd.password");
    if (!passwordCompare) throw new UnauthorizedException({ message: "Incorect password" });

    return this.generateToken(userFromBd);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = "await this.userService.getUserByEmail(userDto.email)";
    console.log("registration-", userDto);
    if (candidate) throw  new HttpException("User are present with this E-mail", HttpStatus.BAD_REQUEST);
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    return this.generateToken(user);
  }

  private async generateToken(user) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload)
    };
  }

  private async validateUser(userDto: CreateUserDto) {

  }
}