import type { Constructor } from 'automapper/core';
import type { MappedType } from './mapped-type';
export declare function MapperPickType<T, K extends keyof T>(
  classRef: Constructor<T>,
  keys: readonly K[],
): MappedType<Pick<T, (typeof keys)[number]>>;