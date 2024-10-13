import {Body, Controller, Get, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {GithubLoginService, LoginResponse} from "./github-login.service";

@Controller({path: 'github', version: '1'})
export class GithubLoginController {
  constructor(private _githubLoginService: GithubLoginService) {
  }

  @Get('clientID')
  @HttpCode(HttpStatus.OK)
  async getClientID(): Promise<string> {
    return this._githubLoginService.getClientID();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body('code') code: string): Promise<LoginResponse> {
    return this._githubLoginService.login(code);
  }
}
