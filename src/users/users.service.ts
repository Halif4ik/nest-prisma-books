import {HttpException, HttpStatus, Injectable, Logger, OnApplicationBootstrap} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {PrismaService} from '../prisma.service';
import {ConfigService} from "@nestjs/config";
import {User} from "@prisma/client";

@Injectable()
export class UsersService implements OnApplicationBootstrap {
    private readonly logger: Logger = new Logger(UsersService.name);

    constructor(private prisma: PrismaService, private readonly configService: ConfigService) {
    }

    async onApplicationBootstrap(): Promise<void> {
        await this.createUser();
    }

    async createUser(): Promise<User> {
        const newUser: User = await this.prisma.user.upsert({
            where: {
                email: this.configService.get<string>('USER_EMAIL'),
            },
            create: {
                email: this.configService.get<string>('USER_EMAIL'),
                name: this.configService.get<string>('USER_NAME'),
                face: this.configService.get<string>('USER_FACE').codePointAt(0),
            },
            update: {},
        });
        this.logger.log(`Created or found user- ${newUser.email}`);
        return newUser;
    }

}
