import {Body, Controller, Get, Post, Query, Req, UseGuards} from '@nestjs/common';
import { PageService } from './page.service';
import {Page} from "./page.entity";
import {AuthGuard} from "../../auth/auth.guard";
import {UserDecorator} from "../../auth/user/user.decorator";
import {User} from "../../auth/user/user.entity";
import {PageCreateDTO} from "./page.dto";

@Controller({version: '1'})
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('home')
  async getHomePage(): Promise<Page> {
    return this.pageService.getHomePage();
  }

  @Get('rootPages')
  async getRootPages(): Promise<Page[]> {
    return this.pageService.getRootPages();
  }

  @Get('rootPage')
  async getRootPage(@Query('entry') entry?: number): Promise<Page> {
    return this.pageService.getRootPage(entry);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createPage(@UserDecorator() user: User, @Body() page: PageCreateDTO): Promise<void> {
    await this.pageService.createPage(user, page);
  }
}
