import type { Dictionary, MapInitializeReturn, SelectorReturn } from '../types';
export declare function mapInitialize<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TSelectorReturn = SelectorReturn<TDestination>,
>(sourcePath: string[]): MapInitializeReturn<TSource, TDestination, TSelectorReturn>;