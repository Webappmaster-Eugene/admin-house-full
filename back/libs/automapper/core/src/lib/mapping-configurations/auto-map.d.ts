import type { MappingConfiguration } from '../types';
export declare function autoMap<
  TSource extends {
    [key in TKey]: TValue;
  },
  TDestination extends {
    [key in TKey]: TValue;
  },
  TKey extends keyof TSource & keyof TDestination,
  TValue extends TSource[TKey] & TDestination[TKey],
>(prop: TKey): MappingConfiguration<TSource, TDestination>;