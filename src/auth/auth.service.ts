import { Injectable } from '@nestjs/common';
import {JwtPayload} from "../utils/request";
import {User} from "./user/user.entity";
import * as argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";

export type UserProfile = {
  id: number;
  username: string;
  superuser: boolean;
}

export type TokensResponse = {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(private _jwtService: JwtService, @InjectRepository(User) private userRepository: Repository<User>, private _configService: ConfigService) {}

  async getProfile(user: User): Promise<UserProfile> {
    return {
      id: user.id,
      username: user.username,
      superuser: user.superuser,
    }
  }

  async generateTokens(user: User): Promise<TokensResponse> {
    const refreshToken = await this._jwtService.signAsync({
      sub: user.id,
      username: user.username,
      superuser: user.superuser
    }, {
      expiresIn: '7d',
      secret: this._configService.get<string>('JWT_REFRESH_SECRET'),
    });
    await this.userRepository.update(user, {refresh_token: await argon2.hash(refreshToken)});
    return {
      accessToken: await this._jwtService.signAsync({
        sub: user.id,
        username: user.username,
        superuser: user.superuser
      }),
      refreshToken: refreshToken
    }
  }
}
