import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppInfoModule } from '../app-info.module';
import { AppInfoService } from '../app-info.service';

describe('AppInfo', () => {
  let app: INestApplication;
  const appInfoService = { get: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppInfoModule],
    })
      .overrideProvider(AppInfoService)
      .useValue(appInfoService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET app-info`, () => {
    return request(app.getHttpServer()).get('/app-info').expect(200);
    // .expect({
    // data: appInfoService.findAll(),
    // });
  });

  afterAll(async () => {
    await app.close();
  });
});
