import { ExecutionContext } from '@nestjs/common';

type MockRequestOverrides = {
  params?: Record<string, string>;
  headers?: Record<string, string>;
  body?: unknown;
};

export function buildMockExecutionContext(overrides: MockRequestOverrides = {}): ExecutionContext {
  const request = {
    params: overrides.params ?? {},
    headers: overrides.headers ?? {},
    body: overrides.body,
  };

  return {
    switchToHttp: () => ({
      getRequest: () => request,
      getResponse: () => ({}),
      getNext: () => undefined,
    }),
  } as unknown as ExecutionContext;
}
