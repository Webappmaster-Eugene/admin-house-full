import type { Dictionary, MapFromReturn, Resolver, SelectorReturn, ValueSelector } from '../types';
export declare function mapFrom<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TSelectorReturn = SelectorReturn<TDestination>,
>(
  from: ValueSelector<TSource, TDestination, TSelectorReturn> | Resolver<TSource, TDestination, TSelectorReturn>,
): MapFromReturn<TSource, TDestination, TSelectorReturn>;