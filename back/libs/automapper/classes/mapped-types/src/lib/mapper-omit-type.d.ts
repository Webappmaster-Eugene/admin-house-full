import type { Constructor } from 'automapper/core';
import type { MappedType } from './mapped-type';
export declare function MapperOmitType<T, K extends keyof T>(
  classRef: Constructor<T>,
  keys: readonly K[],
): MappedType<Omit<T, (typeof keys)[number]>>;