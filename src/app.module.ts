import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./auth/user/user.entity";
import {RouterModule} from "@nestjs/core";
import { AuthModule } from './auth/auth.module';
import {JwtModule} from "@nestjs/jwt";
import { PageModule } from './content/page/page.module';
import {Page} from "./content/page/page.entity";
import {PageSection} from "./content/page/page-section.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DATABASE'),
        synchronize: true,
        entities: [User, Page, PageSection],
      })
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '15m'
        }
      }),
      global: true
    }),
    RouterModule.register([
      {path: 'auth', module: AuthModule},
      {path: 'page', module: PageModule},
    ]),
    AuthModule,
    PageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
