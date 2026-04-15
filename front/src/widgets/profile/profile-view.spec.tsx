import { render, screen } from '@testing-library/react';
import { UserGetFullInfoCommand } from '@numart/house-admin-contracts';

import ProfileView from './profile-view';

jest.mock('src/shared/settings', () => ({
  useSettingsContext: () => ({ themeStretch: false }),
}));

jest.mock('src/shared/iconify', () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock('src/shared/router-link/router-link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock('src/shared/breadcrumbs/custom-breadcrumbs', () => ({
  __esModule: true,
  default: ({ heading }: { heading: string }) => <h1>{heading}</h1>,
}));

type MockUser = UserGetFullInfoCommand.ResponseEntity;

const WORKSPACE_UUID = '11111111-1111-4111-8111-111111111111';
const PROJECT_UUID = '22222222-2222-4222-8222-222222222222';
const USER_UUID = '33333333-3333-4333-8333-333333333333';

function buildUser(overrides: Partial<MockUser> = {}): MockUser {
  return {
    uuid: USER_UUID,
    firstName: 'Ivan',
    secondName: 'Ivanov',
    email: 'test@mail.ru',
    phone: null,
    avatar: null,
    address: null,
    info: null,
    userStatus: 'ACTIVE',
    roles: [],
    memberOfWorkspaces: [],
    creatorOfWorkspace: null,
    memberOfProjects: [],
    customerOfProjects: [],
    responsibleManagerOfProjects: [],
    memberOfOrganizations: [],
    leaderOfOrganizations: [],
    handbookManager: null,
    ...overrides,
  } as MockUser;
}

describe('ProfileView', () => {
  it('should render "Перейти в справочник" button for MANAGER role', () => {
    const manager = buildUser({
      roles: [{ uuid: 'r1', idRole: 2, name: 'MANAGER' }],
    });

    render(<ProfileView currentUser={manager} />);

    expect(screen.getByRole('link', { name: /перейти в справочник/i })).toBeInTheDocument();
  });

  it('should render projects table with memberOfProjects for WORKER role', () => {
    const worker = buildUser({
      roles: [{ uuid: 'r1', idRole: 3, name: 'WORKER' }],
      memberOfProjects: [
        {
          uuid: PROJECT_UUID,
          name: 'House №1.1.1',
          description: 'Family house',
          projectStatus: 'ACTIVE',
          organizationUuid: WORKSPACE_UUID,
          customerUuid: null,
          customerMail: null,
          responsibleManagerUuid: USER_UUID,
          lastChangeByUserUuid: null,
          createdAt: new Date('2025-01-10'),
          updatedAt: new Date('2025-01-10'),
        },
      ],
    });

    render(<ProfileView currentUser={worker} />);

    expect(screen.getByText('Проекты, где я участник')).toBeInTheDocument();
    expect(screen.getByText('House №1.1.1')).toBeInTheDocument();
    expect(screen.getByText('Family house')).toBeInTheDocument();
  });
});
