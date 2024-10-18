import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserService} from "./user/user.service";
import {JwtPayload, Request} from "../utils/request";
import * as argon2 from "argon2";

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService, private userService: UserService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const refresh_token = request.cookies['refresh_token'];
    if (!refresh_token) {
      throw new UnauthorizedException();
    }
    try {
      const tokenData: JwtPayload = await this.jwtService.verifyAsync(refresh_token);
      const user = await this.userService.getById(tokenData.sub);
      if (!await argon2.verify(user.refresh_token, refresh_token)) {
        throw new UnauthorizedException();
      }
      request.user = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
