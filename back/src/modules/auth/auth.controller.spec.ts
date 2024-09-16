// import { Test } from '@nestjs/testing';
// import { AuthController } from '../../modules/auth/auth.controller';
// import { AuthService } from '../../modules/auth/auth.service';
// import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';
// import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
// import { KFI } from 'src/common/utils/di';
// import { AuthRepository } from 'src/modules/auth/auth.repository';
// import { PrismaService } from 'src/modules/common/prisma/prisma.service';
//
// describe('AuthController', () => {
//   let authController: AuthController;
//   let authService: AuthService;
//
//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       controllers: [AuthController],
//       providers: [
//         {
//           provide: KFI.AUTH_REPOSITORY,
//           useClass: AuthRepository,
//         },
//         {
//           provide: KFI.AUTH_SERVICE,
//           useClass: AuthService,
//         },
//         PrismaService,
//       ],
//     }).compile();
//
//     //authService = moduleRef.get<AuthService>(AuthService);
//     //authController = moduleRef.get<AuthController>(AuthController);
//     authService = await moduleRef.resolve(AuthService);
//     authController = await moduleRef.resolve(AuthController);
//   });
//
//   describe('getStrictAdminKeyEP', () => {
//     it('should return a string with common attributes', async () => {
//       const resultFromService = new InternalResponse({ key: 'secret-key' });
//       jest.spyOn(authService, 'getStrictAdminKey').mockImplementation(async () => resultFromService);
//       const expectedResult = await authController.getStrictAdminKeyEP();
//       const realResult = new ExternalResponse<{ key: string }>(resultFromService.data as { key: string });
//
//       expect(expectedResult).toStrictEqual(realResult);
//     });
//   });
// });
