import {Injectable, NotFoundException} from '@nestjs/common';
import {Page, PageType} from "./page.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class PageService {
  constructor(@InjectRepository(Page) private pageRepository: Repository<Page>) {
  }

  async getHomePage(): Promise<Page> {
    const page = this.pageRepository.findOneBy({page_type: PageType.HOME});
    if (!page) {
      throw new NotFoundException("Home page not found.");
    }
    return page;
  }
}
