import type { DeferFunction, Dictionary, MapDeferReturn } from '../types';
import { SelectorReturn } from '../types';
export declare function mapDefer<
  TSource extends Dictionary<TSource> = any,
  TDestination extends Dictionary<TDestination> = any,
  TSelectorReturn = SelectorReturn<TDestination>,
>(defer: DeferFunction<TSource, TDestination, TSelectorReturn>): MapDeferReturn<TSource, TDestination, TSelectorReturn>;