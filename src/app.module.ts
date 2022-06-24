import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { getPinoHttpOptions } from './utils/logger/pino';

@Module({
  imports: [
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
