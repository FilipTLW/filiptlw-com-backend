import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import axios from "axios";
import {InjectRepository} from "@nestjs/typeorm";
import {LoginType, User} from "../user/user.entity";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
import * as argon2 from "argon2";
import {AuthService, TokensResponse} from "../auth.service";

type GithubLoginResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
  token_type: string;
  scope: string;
}

type GithubUserDataResponse = {
  login: string;
  id: number;
}

export type ClientIdResponse = {
  clientId: string;
}

@Injectable()
export class GithubLoginService {

  constructor(private _configService: ConfigService, @InjectRepository(User) private userRepository: Repository<User>, private _jwtService: JwtService, private _authService: AuthService) {
  }

  getClientID(): ClientIdResponse {
    return {
      clientId: this._configService.get<string>('GITHUB_CLIENT_ID')
    };
  }

  async login(code: string): Promise<TokensResponse> {
    const params = new FormData();
    params.append('client_id', this._configService.get<string>('GITHUB_CLIENT_ID'));
    params.append('client_secret', this._configService.get<string>('GITHUB_CLIENT_SECRET'));
    params.append('code', code);
    const result = await axios.post<GithubLoginResponse>('https://github.com/login/oauth/access_token', params, {
      headers: {
        'Accept': 'application/json'
      }
    });

    const user_info = await axios.get<GithubUserDataResponse>('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${result.data.access_token}`,
        'Accept': 'application/json'
      },
      validateStatus: () => true
    });

    if (user_info.status !== 200) {
      throw new UnauthorizedException();
    }

    let user = await this.userRepository.findOneBy({external_id: user_info.data.id.toString(), login_type: LoginType.GITHUB});
    if (user === null) {
      await this.userRepository.insert({
        external_id: user_info.data.id.toString(),
        login_type: LoginType.GITHUB,
        username: user_info.data.login
      });
    }
    user = await this.userRepository.findOneBy({external_id: user_info.data.id.toString(), login_type: LoginType.GITHUB});
    if (!user) {
      throw new Error('The database decided to not.');
    }
    return this._authService.generateTokens(user);
  }
}
