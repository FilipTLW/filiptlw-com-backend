import {Controller, Get, Post, Res, UseGuards} from '@nestjs/common';
import {AuthGuard} from "./auth.guard";
import {AuthService} from "./auth.service";
import {UserDecorator} from "./user/user.decorator";
import {RefreshGuard} from "./refresh.guard";
import {User} from "./user/user.entity";
import {Response} from "express";

@Controller({version: '1'})
export class AuthController {

  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@UserDecorator() user: User) {
    return this.authService.getProfile(user);
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  async refresh(@UserDecorator() user: User, @Res({passthrough: true}) response: Response) {
    const tokens = await this.authService.generateTokens(user);
    response.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 15 * 60 * 1000),
      sameSite: 'strict',
    });
    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      sameSite: 'strict'
    });
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@UserDecorator() user: User, @Res({passthrough: true}) response: Response) {
    await this.authService.invalidateRefreshToken(user);
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
  }
}
