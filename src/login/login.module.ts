import { Module } from '@nestjs/common';
import { GithubLoginController } from './github/github-login.controller';
import { GithubLoginService } from './github/github-login.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [GithubLoginController],
  providers: [GithubLoginService]
})
export class LoginModule {}
