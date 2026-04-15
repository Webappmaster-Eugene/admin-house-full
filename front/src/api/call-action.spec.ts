import { AxiosError } from 'axios';

import { callAction } from './call-action';

const revalidatePathMock = jest.fn();

jest.mock('next/cache', () => ({
  revalidatePath: (path: string) => revalidatePathMock(path),
}));

type Project = { uuid: string; name: string };

const buildBackendResponse = <T>(
  statusCode: number,
  data: T,
  extras: { message?: string; errors?: Array<{ name: string; description: string }> | null } = {}
) => ({
  statusCode,
  message: extras.message ?? 'Success',
  errors: extras.errors,
  data,
});

describe('callAction', () => {
  beforeEach(() => {
    revalidatePathMock.mockClear();
  });

  it('should return data when backend returns OK status code', async () => {
    const project: Project = { uuid: 'p-1', name: 'Project A' };

    const result = await callAction<Project>(async () => buildBackendResponse(200, project));

    expect(result).toEqual(project);
  });

  it('should call revalidatePath for each path on successful mutation', async () => {
    const project: Project = { uuid: 'p-2', name: 'Project B' };

    await callAction<Project>(
      async () => buildBackendResponse(201, project),
      ['/dashboard', '/profile']
    );

    expect(revalidatePathMock).toHaveBeenCalledTimes(2);
    expect(revalidatePathMock).toHaveBeenCalledWith('/dashboard');
    expect(revalidatePathMock).toHaveBeenCalledWith('/profile');
  });

  it('should return ErrorFromBackend when backend returns non-OK status with errors array', async () => {
    const result = await callAction<Project>(async () =>
      buildBackendResponse(404, null as unknown as Project, {
        errors: [{ name: 'NotFound', description: 'Project not found' }],
      })
    );

    expect(result).toEqual({
      error: { name: 'NotFound', description: 'Project not found' },
    });
  });

  it('should return ErrorFromBackend with message when no errors array', async () => {
    const result = await callAction<Project>(async () =>
      buildBackendResponse(500, null as unknown as Project, {
        message: 'Internal error',
      })
    );

    expect(result).toEqual({ error: 'Internal error' });
  });

  it('should return ErrorFromBackend when AxiosError is thrown', async () => {
    const result = await callAction<Project>(async () => {
      throw new AxiosError('Network Error');
    });

    expect(result).toEqual({ error: 'Network Error' });
  });
});
