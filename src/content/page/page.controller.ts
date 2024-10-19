import {Controller, Get, Req} from '@nestjs/common';
import { PageService } from './page.service';
import {Page} from "./page.entity";

@Controller({version: '1'})
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get('home')
  async getHomePage(): Promise<Page> {
    return this.pageService.getHomePage();
  }
}
