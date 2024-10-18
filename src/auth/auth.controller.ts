import {Controller, Get, UseGuards} from '@nestjs/common';
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";
import {UserDecorator} from "./user/user.decorator";
import {RefreshGuard} from "./refresh.guard";
import {User} from "./user/user.entity";

@Controller({version: '1'})
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@UserDecorator() user: User) {
    return this.authService.getProfile(user);
  }

  @UseGuards(RefreshGuard)
  @Get('refresh')
  async refresh(@UserDecorator() user: User) {
    return this.authService.generateTokens(user);
  }
}
