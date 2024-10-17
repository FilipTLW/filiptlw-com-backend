import { Injectable } from '@nestjs/common';
import {JwtPayload} from "../utils/request";

export type UserProfile = {
  id: number;
  username: string;
  superuser: boolean;
}

@Injectable()
export class AuthService {
  async getProfile(user: JwtPayload): Promise<UserProfile> {
    return {
      id: user.sub,
      username: user.username,
      superuser: user.superuser,
    }
  }
}
