import {Controller, Get, UseGuards} from '@nestjs/common';
import {AuthGuard} from "./auth.guard";
import {JwtPayload} from '../utils/request'
import {AuthService} from "./auth.service";
import {User} from "./user.decorator";

@Controller({version: '1'})
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@User() user: JwtPayload) {
    return this.authService.getProfile(user);
  }
}
