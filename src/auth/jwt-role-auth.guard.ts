import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./rolel-auth.decorator";

@Injectable()
export class JwtRoleAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [context.getHandler(), context.getClass]);
      if (!requiredRoles) return;
      const authHeder = req.headers.authorization;
      let bearer, token;
      if (authHeder) {
        bearer = authHeder.split(" ")[0];
        token = authHeder.split(" ")[1];
      }
      if (bearer !== "Bearer" || !token) throw new UnauthorizedException({ message: "Uswer doesnt authorizaded" });

      const userFromJwt = this.jwtService.verify(token);
      req.user = userFromJwt;
      const temp = userFromJwt.roles.some(role =>{
        console.log('role-value',role.value);
       return  requiredRoles.includes(role)
      } );
      return temp

    } catch (e) {
      console.log("!!JwtRoleAuthGuard-", e);
      throw new HttpException("Uswer doesnt has roots", HttpStatus.FORBIDDEN);
    }
  }

}