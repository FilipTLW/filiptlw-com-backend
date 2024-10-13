import { Test, TestingModule } from '@nestjs/testing';
import { GithubLoginService } from './github-login.service';

describe('LoginService', () => {
  let service: GithubLoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubLoginService],
    }).compile();

    service = module.get<GithubLoginService>(GithubLoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
