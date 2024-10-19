import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Page} from "./page.entity";
import {PageSection} from "./page-section.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Page, PageSection]),
  ],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
