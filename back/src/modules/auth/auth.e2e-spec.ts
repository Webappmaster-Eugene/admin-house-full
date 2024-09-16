import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../../modules/auth/auth.module';
import { AuthService } from '../../modules/auth/auth.service';
import { IUrlParams } from '../../common/decorators/url-params.decorator';
import { AuthGetKeyResponseDto } from '../../modules/auth/dto/controller/auth.get-key.dto';

describe('Auth', () => {
  let app: INestApplication;
  const authService = {
    getStrictAdminKey: () => {
      return { key: '2a10aBvLOdwaN1bu9jtqNOfECO1EOo0CNRGqIC0NJnoAgWSEkQO0sD6pG' };
    },
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET auth/strict-admin-key/get`, () => {
    return request(app.getHttpServer()).get('/auth/strict-admin-key/get').expect(200).expect({
      errors: undefined,
      data: authService.getStrictAdminKey(),
      statusCode: 200,
      message: 'Success',
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
