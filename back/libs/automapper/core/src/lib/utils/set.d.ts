export declare function set<T extends Record<string, unknown>>(
  object: T,
  path: string[],
  value: unknown,
):
  | (T & {
      [p: string]: unknown;
    })
  | T;
export declare function setMutate<T extends Record<string, unknown>>(object: T, path: string[], value: unknown): void;