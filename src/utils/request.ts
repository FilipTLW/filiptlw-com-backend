export type JwtPayload = {
  sub: number;
  username: string;
  superuser: boolean;
}

export type Request = {
  user: JwtPayload;
}