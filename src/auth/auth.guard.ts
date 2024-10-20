import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {Request} from "../utils/request";
import {UserService} from "./user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService, private userService: UserService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.cookies['access_token'];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const tokenData = await this.jwtService.verifyAsync(token);
      request.user = await this.userService.getById(tokenData.sub);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
