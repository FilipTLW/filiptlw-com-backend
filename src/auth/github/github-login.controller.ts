import {Body, Controller, Get, HttpCode, HttpStatus, Post, Res} from '@nestjs/common';
import {ClientIdResponse, GithubLoginService} from "./github-login.service";
import {Response} from "express";

@Controller({path: 'github', version: '1'})
export class GithubLoginController {
  constructor(private _githubLoginService: GithubLoginService) {
  }

  @Get('clientID')
  @HttpCode(HttpStatus.OK)
  async getClientID(): Promise<ClientIdResponse> {
    return this._githubLoginService.getClientID();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body('code') code: string, @Res({passthrough: true}) response: Response): Promise<void> {
    const tokens = await this._githubLoginService.login(code);
    response.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      sameSite: 'strict',
    });
    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(new Date().getTime() + 60 * 60 * 1000),
      sameSite: 'strict'
    });
  }
}
