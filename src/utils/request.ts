import {Request as ExpressRequest} from "express";
import {User} from "../auth/user/user.entity";

export type JwtPayload = {
  sub: number;
  username: string;
  superuser: boolean;
}

export type Request = ExpressRequest & {
  user: User;
}