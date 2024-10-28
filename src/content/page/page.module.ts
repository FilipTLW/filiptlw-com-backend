import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Page} from "./page.entity";
import {PageSection} from "./page-section.entity";
import {AuthModule} from "../../auth/auth.module";
import {UserService} from "../../auth/user/user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Page, PageSection]),
    AuthModule
  ],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
