import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { getPinoHttpOptions } from './utils/utils';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BookmarkModule,
    AuthModule,
    UserModule,
    PrismaModule,
    LoggerModule.forRootAsync({
      useFactory: () => ({
        pinoHttp: getPinoHttpOptions(),
      }),
    }),
  ],
})
export class AppModule {}
