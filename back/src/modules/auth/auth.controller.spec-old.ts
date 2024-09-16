import { AuthService } from '../../modules/auth/auth.service';
import { AuthController } from '../../modules/auth/auth.controller';
import { ExternalResponse } from '../../common/types/responses/universal-external-response.interface';
import { InternalResponse } from '../../common/types/responses/universal-internal-response.interface';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    authController = new AuthController(authService);
  });

  describe('getStrictAdminKeyEP', () => {
    it('should return a string with common attributes', async () => {
      const resultFromService = new InternalResponse({ key: 'secret-key' });
      jest.spyOn(authService, 'getStrictAdminKey').mockImplementation(async () => resultFromService);
      const expectedResult = await authController.getStrictAdminKeyEP();
      const realResult = new ExternalResponse<{ key: string }>(resultFromService.data as { key: string });

      expect(expectedResult).toStrictEqual(realResult);
    });
  });
});
