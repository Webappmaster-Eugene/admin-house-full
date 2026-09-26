import { CacheStore } from '@nestjs/cache-manager';

import { UserService } from '../user.service';
import { IUserRepository } from '../types/user.repository.interface';
import { IRoleService } from '../../roles/types/role.service.interface';
import { IWorkspaceService } from '../../workspace/types/workspace.service.interface';
import { IHandbookService } from '../../handbook/types/handbook.service.interface';
import { IProjectService } from '../../project/types/project.service.interface';
import { IOrganizationService } from '../../organization/types/organization.service.interface';
import { IPrismaService } from '../../../common/types/main/prisma.interface';
import { UserCreateRequestDto } from '../dto/controller/create-user.dto';
import { ROLE_IDS } from '../../../common/consts/role-ids';

const USER_UUID = '11111111-1111-4111-8111-111111111111';
const WORKSPACE_UUID = '22222222-2222-4222-8222-222222222222';
const HANDBOOK_UUID = '33333333-3333-4333-8333-333333333333';
const MANAGER_ROLE_UUID = '44444444-4444-4444-8444-444444444444';

const dto = { email: 'manager@example.com', password: 'Secret-123', firstName: 'Иван', secondName: 'Петров' } as UserCreateRequestDto;

function buildService() {
  const tx = { marker: 'transaction-client' };
  const userRepository = {
    create: jest.fn().mockResolvedValue({ uuid: USER_UUID }),
    getById: jest.fn().mockRejectedValue(new Error('getById вне транзакции не видит нового пользователя')),
    addExistedWorkspaceToManager: jest.fn().mockResolvedValue({ uuid: USER_UUID, creatorOfWorkspaceUuid: WORKSPACE_UUID }),
    addExistedHandbookToManager: jest
      .fn()
      .mockResolvedValue({ uuid: USER_UUID, creatorOfWorkspaceUuid: WORKSPACE_UUID, handbookManagerUuid: HANDBOOK_UUID }),
  };
  const roleService = {
    getById: jest.fn().mockResolvedValue({ ok: true, data: { uuid: MANAGER_ROLE_UUID, idRole: ROLE_IDS.MANAGER_ROLE_ID } }),
  };
  const workspaceService = {
    create: jest.fn().mockResolvedValue({ ok: true, data: { uuid: WORKSPACE_UUID } }),
    updateById: jest.fn().mockResolvedValue({ ok: true, data: { uuid: WORKSPACE_UUID } }),
    linkHandbook: jest.fn().mockResolvedValue({ ok: true, data: { uuid: WORKSPACE_UUID, handbookOfWorkspaceUuid: HANDBOOK_UUID } }),
  };
  const handbookService = { create: jest.fn().mockResolvedValue({ ok: true, data: { uuid: HANDBOOK_UUID } }) };
  const cacheManager = { get: jest.fn(), set: jest.fn(), del: jest.fn() };
  const databaseService = { $transaction: jest.fn((callback: (client: unknown) => unknown) => callback(tx)) };

  const service = new UserService(
    userRepository as unknown as IUserRepository,
    roleService as unknown as IRoleService,
    workspaceService as unknown as IWorkspaceService,
    {} as IOrganizationService,
    {} as IProjectService,
    handbookService as unknown as IHandbookService,
    cacheManager as unknown as CacheStore,
    databaseService as unknown as IPrismaService,
  );
  return { service, tx, userRepository, workspaceService };
}

describe('Создание пользователя с ролью MANAGER', () => {
  it('should link new workspace and handbook inside the same transaction without reading the uncommitted user', async () => {
    // Arrange
    const { service, tx, userRepository } = buildService();

    // Act
    const result = await service.create(dto, [ROLE_IDS.MANAGER_ROLE_ID]);

    // Assert: привязка идёт транзакционным клиентом, а getById (вне транзакции) не вызывается —
    // раньше он падал с 404 и откатывал регистрацию менеджера.
    expect(userRepository.getById).not.toHaveBeenCalled();
    expect(userRepository.addExistedWorkspaceToManager).toHaveBeenCalledWith(USER_UUID, WORKSPACE_UUID, tx);
    expect(userRepository.addExistedHandbookToManager).toHaveBeenCalledWith(USER_UUID, HANDBOOK_UUID, tx);
    expect(result).toMatchObject({ ok: true, data: { creatorOfWorkspaceUuid: WORKSPACE_UUID, handbookManagerUuid: HANDBOOK_UUID } });
  });

  it('should link the new handbook to the new workspace', async () => {
    // Arrange
    const { service, tx, workspaceService } = buildService();

    // Act
    await service.create(dto, [ROLE_IDS.MANAGER_ROLE_ID]);

    // Assert: updateById сохраняет только name/description — через него справочник не привязывался,
    // и страницы единичек/пирогов у нового менеджера падали (handbookOfWorkspaceUuid = null).
    expect(workspaceService.linkHandbook).toHaveBeenCalledWith(WORKSPACE_UUID, HANDBOOK_UUID, tx);
    expect(workspaceService.updateById).not.toHaveBeenCalled();
  });
});
