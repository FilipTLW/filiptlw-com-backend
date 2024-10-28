import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {Page, PageType} from "./page.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import {User} from "../../auth/user/user.entity";
import {PageCreateDTO} from "./page.dto";
import {UserService} from "../../auth/user/user.service";

@Injectable()
export class PageService {
  constructor(@InjectRepository(Page) private pageRepository: Repository<Page>, private userService: UserService, private dataSource: DataSource) {
  }
  async getHomePage(): Promise<Page> {
    const page = this.pageRepository.findOneBy({page_type: PageType.HOME});
    if (!page) {
      throw new NotFoundException("Home page not found.");
    }
    return page;
  }

  async getRootPages(): Promise<Page[]> {
    return this.pageRepository.findBy({
      user: {
        home_path: '/root'
      }
    });
  }

  async getRootPage(entry?: number): Promise<Page> {
    if (!entry) {
      throw new NotFoundException();
    }
    const page = await this.pageRepository.findOneBy({
      user: {
        home_path: '/root'
      },
      entry
    });
    if (!page) {
      throw new NotFoundException();
    }
    return page;
  }

  async createPage(user: User, page: PageCreateDTO) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const pageEntity: Page = {
        page_type: PageType.USER,
        user: user,
        entry: user.next_entry,
        title: page.title,
        subtitle: page.subtitle,
        header: page.header,
        footer: page.footer,
        sections: page.sections
      }
      Object.assign(user, {
        next_entry: user.next_entry + 1
      });

      await queryRunner.manager.save([user]);
      await queryRunner.manager.save(Page, pageEntity);

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.error(e);
      throw new InternalServerErrorException()
    } finally {
      await queryRunner.release();
    }
  }
}
