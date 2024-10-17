import { Test, TestingModule } from '@nestjs/testing';
import { GithubLoginController } from './github-login.controller';

describe('LoginController', () => {
  let controller: GithubLoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GithubLoginController],
    }).compile();

    controller = module.get<GithubLoginController>(GithubLoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
