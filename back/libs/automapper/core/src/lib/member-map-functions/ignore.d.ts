import type { Dictionary, IgnoreReturn } from '../types';
export declare function ignore<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(): IgnoreReturn<
  TSource,
  TDestination
>;