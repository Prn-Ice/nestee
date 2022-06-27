import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.init();

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      it.todo('should signup');
    });

    describe('Login', () => {
      it.todo('should login');
    });
  });

  describe('User', () => {
    describe('Get user', () => {
      it.todo('should get user');
    });

    describe('Edit user', () => {
      it.todo('should edit user');
    });
  });

  describe('Bookmarks', () => {
    describe('Create bookmark', () => {
      it.todo('should create bookmark');
    });

    describe('Get bookmarks', () => {
      it.todo('should get bookmark');
    });

    describe('Get bookmark by id', () => {
      it.todo('should get bookmark bby id');
    });

    describe('Edit bookmark', () => {
      it.todo('should edit bookmark');
    });

    describe('Delete bookmark', () => {
      it.todo('should delete bookmark');
    });
  });
});
