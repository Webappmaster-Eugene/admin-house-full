import * as jwt from 'jsonwebtoken';
import { HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { WorkspaceCreatorGuard } from './workspace-creator.guard';
import { ROLE_IDS } from '../consts/role-ids';
import { IUserService } from '../../modules/user/types/user.service.interface';
import { IWorkspaceService } from '../../modules/workspace/types/workspace.service.interface';
import { ILogger } from '../types/main/logger.interface';
import { IConfigService } from '../types/main/config.service.interface';
import { buildMockExecutionContext } from './__tests__/__helpers__/mock-execution-context';

const JWT_SECRET = 'test-jwt-secret';
const VALID_WORKSPACE_UUID = '11111111-1111-4111-8111-111111111111';
const OTHER_WORKSPACE_UUID = '22222222-2222-4222-8222-222222222222';
const USER_UUID = '33333333-3333-4333-8333-333333333333';

type MinimalUser = {
  uuid: string;
  roles: Array<{ uuid: string; idRole: number; name: string }>;
  memberOfWorkspaces: Array<{ uuid: string }>;
  creatorOfWorkspaceUuid: string | null;
};

function buildAuthHeader(payload: Record<string, unknown>, options: jwt.SignOptions = {}): string {
  const token = jwt.sign(payload, JWT_SECRET, options);
  return `Bearer ${token}`;
}

function buildGuard(overrides: {
  user?: MinimalUser | null;
  workspace?: { uuid: string } | null;
} = {}): WorkspaceCreatorGuard {
  const defaultUser: MinimalUser = {
    uuid: USER_UUID,
    roles: [{ uuid: 'role-1', idRole: ROLE_IDS.MANAGER_ROLE_ID, name: 'MANAGER' }],
    memberOfWorkspaces: [],
    creatorOfWorkspaceUuid: null,
  };

  const userService: Pick<IUserService, 'getFullInfoById'> = {
    getFullInfoById: jest.fn().mockResolvedValue({
      ok: true,
      data: overrides.user === null ? null : overrides.user ?? defaultUser,
    }),
  };

  const workspaceService: Pick<IWorkspaceService, 'getById'> = {
    getById: jest.fn().mockResolvedValue({
      ok: true,
      data:
        overrides.workspace === null
          ? null
          : overrides.workspace ?? { uuid: VALID_WORKSPACE_UUID },
    }),
  };

  const configService = {
    get: jest.fn((key: string) => (key === 'JWT_KEY' ? JWT_SECRET : undefined)),
  } as unknown as ConfigService<IConfigService>;

  const logger: Pick<ILogger, 'error'> = { error: jest.fn() };

  return new WorkspaceCreatorGuard(
    configService,
    userService as IUserService,
    workspaceService as IWorkspaceService,
    logger as ILogger,
  );
}

describe('WorkspaceCreatorGuard', () => {
  it('should throw 400 BadRequest when workspaceId is not a valid UUID', async () => {
    const guard = buildGuard();
    const context = buildMockExecutionContext({
      params: { workspaceId: 'not-a-uuid' },
      headers: { authorization: buildAuthHeader({ uuid: USER_UUID }) },
    });

    await expect(guard.canActivate(context)).rejects.toMatchObject({
      response: expect.objectContaining({ statusCode: 400 }),
    });
  });

  it('should return true for ADMIN with valid workspace UUID', async () => {
    const adminUser: MinimalUser = {
      uuid: USER_UUID,
      roles: [{ uuid: 'role-admin', idRole: ROLE_IDS.ADMIN_ROLE_ID, name: 'ADMIN' }],
      memberOfWorkspaces: [],
      creatorOfWorkspaceUuid: null,
    };
    const guard = buildGuard({ user: adminUser });
    const context = buildMockExecutionContext({
      params: { workspaceId: VALID_WORKSPACE_UUID },
      headers: { authorization: buildAuthHeader({ uuid: USER_UUID }) },
    });

    await expect(guard.canActivate(context)).resolves.toBe(true);
  });

  it('should return true for creator of the workspace', async () => {
    const creatorUser: MinimalUser = {
      uuid: USER_UUID,
      roles: [{ uuid: 'role-m', idRole: ROLE_IDS.MANAGER_ROLE_ID, name: 'MANAGER' }],
      memberOfWorkspaces: [],
      creatorOfWorkspaceUuid: VALID_WORKSPACE_UUID,
    };
    const guard = buildGuard({
      user: creatorUser,
      workspace: { uuid: VALID_WORKSPACE_UUID },
    });
    const context = buildMockExecutionContext({
      params: { workspaceId: VALID_WORKSPACE_UUID },
      headers: { authorization: buildAuthHeader({ uuid: USER_UUID }) },
    });

    await expect(guard.canActivate(context)).resolves.toBe(true);
  });

  it('should throw 403 for user who is only member (not creator) of workspace', async () => {
    const memberOnlyUser: MinimalUser = {
      uuid: USER_UUID,
      roles: [{ uuid: 'role-m', idRole: ROLE_IDS.MANAGER_ROLE_ID, name: 'MANAGER' }],
      memberOfWorkspaces: [{ uuid: VALID_WORKSPACE_UUID }],
      creatorOfWorkspaceUuid: null,
    };
    const guard = buildGuard({
      user: memberOnlyUser,
      workspace: { uuid: VALID_WORKSPACE_UUID },
    });
    const context = buildMockExecutionContext({
      params: { workspaceId: VALID_WORKSPACE_UUID },
      headers: { authorization: buildAuthHeader({ uuid: USER_UUID }) },
    });

    await expect(guard.canActivate(context)).rejects.toMatchObject({
      response: expect.objectContaining({ statusCode: 403 }),
    });
  });

  it('should throw 403 for user unrelated to workspace', async () => {
    const strangerUser: MinimalUser = {
      uuid: USER_UUID,
      roles: [{ uuid: 'role-m', idRole: ROLE_IDS.MANAGER_ROLE_ID, name: 'MANAGER' }],
      memberOfWorkspaces: [{ uuid: OTHER_WORKSPACE_UUID }],
      creatorOfWorkspaceUuid: OTHER_WORKSPACE_UUID,
    };
    const guard = buildGuard({
      user: strangerUser,
      workspace: { uuid: VALID_WORKSPACE_UUID },
    });
    const context = buildMockExecutionContext({
      params: { workspaceId: VALID_WORKSPACE_UUID },
      headers: { authorization: buildAuthHeader({ uuid: USER_UUID }) },
    });

    await expect(guard.canActivate(context)).rejects.toMatchObject({
      response: expect.objectContaining({ statusCode: 403 }),
    });
  });

  it('should throw HttpException for expired JWT token', async () => {
    const guard = buildGuard();
    const context = buildMockExecutionContext({
      params: { workspaceId: VALID_WORKSPACE_UUID },
      headers: {
        authorization: buildAuthHeader({ uuid: USER_UUID }, { expiresIn: '-1h' }),
      },
    });

    await expect(guard.canActivate(context)).rejects.toBeInstanceOf(HttpException);
  });
});
