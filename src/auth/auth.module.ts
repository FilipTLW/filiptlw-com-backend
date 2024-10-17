import { Module } from '@nestjs/common';
import { GithubLoginController } from './github/github-login.controller';
import { GithubLoginService } from './github/github-login.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [GithubLoginController, AuthController],
  providers: [GithubLoginService, AuthService]
})
export class AuthModule {}
