import { HttpException } from '@nestjs/common';

import { WorkspaceEntityOwnershipGuard } from './workspace-entity-ownership.guard';
import { IPrismaService } from '../types/main/prisma.interface';
import { ILogger } from '../types/main/logger.interface';
import { buildMockExecutionContext } from './__tests__/__helpers__/mock-execution-context';

const WORKSPACE_UUID = '11111111-1111-4111-8111-111111111111';
const ORGANIZATION_UUID = '22222222-2222-4222-8222-222222222222';
const OTHER_ORGANIZATION_UUID = '33333333-3333-4333-8333-333333333333';
const PROJECT_UUID = '44444444-4444-4444-8444-444444444444';

type OwnershipWhere = { uuid: string; workspaceUuid?: string; organizationUuid?: string };

function buildGuard(options: {
  // пары «организация → workspace» и «проект → организация», которые существуют в БД
  organizations?: Record<string, string>;
  projects?: Record<string, string>;
}) {
  const organizations = options.organizations ?? {};
  const projects = options.projects ?? {};

  const organizationFindFirst = jest.fn(async ({ where }: { where: OwnershipWhere }) =>
    organizations[where.uuid] === where.workspaceUuid ? { uuid: where.uuid } : null,
  );
  const projectFindFirst = jest.fn(async ({ where }: { where: OwnershipWhere }) =>
    projects[where.uuid] === where.organizationUuid ? { uuid: where.uuid } : null,
  );

  const databaseService = {
    organization: { findFirst: organizationFindFirst },
    project: { findFirst: projectFindFirst },
  } as unknown as IPrismaService;
  const logger = { error: jest.fn() } as unknown as ILogger;

  return {
    guard: new WorkspaceEntityOwnershipGuard(databaseService, logger),
    organizationFindFirst,
    projectFindFirst,
  };
}

async function expectHttpStatus(promise: Promise<boolean>, status: number): Promise<void> {
  await expect(promise).rejects.toBeInstanceOf(HttpException);
  await promise.catch((error: HttpException) => expect(error.getStatus()).toBe(status));
}

describe('WorkspaceEntityOwnershipGuard', () => {
  it('пропускает организацию своего workspace', async () => {
    const { guard } = buildGuard({ organizations: { [ORGANIZATION_UUID]: WORKSPACE_UUID } });
    const context = buildMockExecutionContext({
      params: { workspaceId: WORKSPACE_UUID, organizationId: ORGANIZATION_UUID },
    });

    await expect(guard.canActivate(context)).resolves.toBe(true);
  });

  it('отвечает 404 на организацию чужого workspace', async () => {
    const { guard } = buildGuard({ organizations: { [ORGANIZATION_UUID]: 'другой-workspace' } });
    const context = buildMockExecutionContext({
      params: { workspaceId: WORKSPACE_UUID, organizationId: ORGANIZATION_UUID },
    });

    await expectHttpStatus(guard.canActivate(context), 404);
  });

  it('пропускает проект своей организации', async () => {
    const { guard } = buildGuard({
      organizations: { [ORGANIZATION_UUID]: WORKSPACE_UUID },
      projects: { [PROJECT_UUID]: ORGANIZATION_UUID },
    });
    const context = buildMockExecutionContext({
      params: { workspaceId: WORKSPACE_UUID, organizationId: ORGANIZATION_UUID, projectId: PROJECT_UUID },
    });

    await expect(guard.canActivate(context)).resolves.toBe(true);
  });

  it('отвечает 404 на проект из другой организации', async () => {
    const { guard } = buildGuard({
      organizations: { [ORGANIZATION_UUID]: WORKSPACE_UUID },
      projects: { [PROJECT_UUID]: OTHER_ORGANIZATION_UUID },
    });
    const context = buildMockExecutionContext({
      params: { workspaceId: WORKSPACE_UUID, organizationId: ORGANIZATION_UUID, projectId: PROJECT_UUID },
    });

    await expectHttpStatus(guard.canActivate(context), 404);
  });

  it('разрешает перенос проекта в организацию того же workspace', async () => {
    const { guard } = buildGuard({
      organizations: { [ORGANIZATION_UUID]: WORKSPACE_UUID, [OTHER_ORGANIZATION_UUID]: WORKSPACE_UUID },
      projects: { [PROJECT_UUID]: ORGANIZATION_UUID },
    });
    const context = buildMockExecutionContext({
      params: { workspaceId: WORKSPACE_UUID, organizationId: ORGANIZATION_UUID, projectId: PROJECT_UUID },
      body: { organizationUuid: OTHER_ORGANIZATION_UUID },
    });

    await expect(guard.canActivate(context)).resolves.toBe(true);
  });

  it('запрещает перенос проекта в организацию чужого workspace', async () => {
    const { guard } = buildGuard({
      organizations: { [ORGANIZATION_UUID]: WORKSPACE_UUID, [OTHER_ORGANIZATION_UUID]: 'другой-workspace' },
      projects: { [PROJECT_UUID]: ORGANIZATION_UUID },
    });
    const context = buildMockExecutionContext({
      params: { workspaceId: WORKSPACE_UUID, organizationId: ORGANIZATION_UUID, projectId: PROJECT_UUID },
      body: { organizationUuid: OTHER_ORGANIZATION_UUID },
    });

    await expectHttpStatus(guard.canActivate(context), 404);
  });

  it('отвечает 400 на невалидный UUID и не ходит в БД', async () => {
    const { guard, organizationFindFirst } = buildGuard({});
    const context = buildMockExecutionContext({
      params: { workspaceId: WORKSPACE_UUID, organizationId: 'not-a-uuid' },
    });

    await expectHttpStatus(guard.canActivate(context), 400);
    expect(organizationFindFirst).not.toHaveBeenCalled();
  });
});
