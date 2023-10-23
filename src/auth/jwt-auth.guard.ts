import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeder = req.headers.authorization;
      let bearer, token;
      if (authHeder) {
        bearer = authHeder.split(" ")[0];
        token = authHeder.split(" ")[1];
      }
      if (bearer !== "Bearer" || !token) throw new UnauthorizedException({ message: "Uswer doesnt authorizaded" });

      const userFromJwt = this.jwtService.verify(token);
      req.user = userFromJwt;
      console.log("canActivate.user-", req.user);
      return req.user = userFromJwt;
    } catch (e) {
      console.log("!!e-", e);
      throw new UnauthorizedException({ message: "Uswer doesnt authorizaded" });
    }
    return undefined;
  }

}