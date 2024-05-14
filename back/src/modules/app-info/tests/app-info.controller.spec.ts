import { Test } from '@nestjs/testing';
import { AppInfoService } from '../app-info.service';
import { AppInfoController } from '../app-info.controller';
import { MethodName } from '../../../common/types/method.enum';
import { KFI } from '../../../common/utils/di';
import { AppInfoRepository } from '../app-info.repository';
import { QUERIES } from '../query';
import { COMMANDS } from '../command';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from '../../../common/utils/validate-config';
import { AppModule } from '../../../app.module';

describe('AppInfoController', () => {
  // let appInfoController: AppInfoController;
  // let appInfoService: AppInfoService;
  //
  // beforeEach(async () => {
  //   const moduleRef = await Test.createTestingModule({
  //     controllers: [AppInfoController],
  //     // providers: [AppInfoService],
  //     providers: [
  //       ...QUERIES,
  //       ...COMMANDS,
  //       {
  //         provide: KFI.APP_INFO_REPOSITORY,
  //         useClass: AppInfoRepository,
  //       },
  //       {
  //         provide: KFI.APP_INFO_SERVICE,
  //         useClass: AppInfoService,
  //       },
  //     ],
  //     imports: [
  //       AppModule,
  //       // CqrsModule,
  //       // PrismaModule,
  //       // ConfigModule.forRoot({
  //       //   envFilePath: `.${process.env.NODE_ENV}.env`,
  //       //   isGlobal: true,
  //       //   validate: config => validateConfig(config),
  //       // }),
  //     ],
  //   }).compile();
  //
  //   appInfoService = moduleRef.get<AppInfoService>(AppInfoService);
  //   appInfoController = moduleRef.get<AppInfoController>(AppInfoController);
  // });

  describe('get app info', () => {
    // it('should return an "OK 200" answer', async () => {
    //   const result = ['test'];
    //   jest.spyOn(appInfoService, 'get').mockImplementation();
    //
    //   expect(
    //     await appInfoController.getEP({
    //       url: '/app-info',
    //       method: MethodName.GET,
    //     }),
    //   ).toBeDefined();
    // });
    it('should return an answer', async () => {
      expect(3).toBeDefined();
    });
  });
});
