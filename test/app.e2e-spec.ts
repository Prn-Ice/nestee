import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

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
    app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(async () => {
    app.close();
  });

  describe('Auth', () => {
    const dto = { email: 'prince@gmail.com', password: '123456' };
    const noEmailDto = { password: dto.password };
    const noPasswordDto = { email: dto.email };

    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(noEmailDto)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(noPasswordDto)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(HttpStatus.CREATED);
      });
    });

    describe('Login', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(noEmailDto)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(noPasswordDto)
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should login', () => {
        return pactum
          .spec()
          .post('/auth/login')
          .withBody(dto)
          .expectStatus(HttpStatus.OK)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get user', () => {
      it('should throw if no access token provided', () => {
        return pactum
          .spec()
          .get('/users/me')
          .expectStatus(HttpStatus.UNAUTHORIZED);
      });

      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(HttpStatus.OK);
      });
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

    describe('Edit bookmark by id', () => {
      it.todo('should edit bookmark');
    });

    describe('Delete bookmark by id', () => {
      it.todo('should delete bookmark');
    });
  });
});
