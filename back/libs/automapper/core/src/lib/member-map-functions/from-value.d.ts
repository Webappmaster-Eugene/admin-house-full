import type { Dictionary, FromValueReturn, SelectorReturn } from '../types';
export declare function fromValue<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TSelectorReturn = SelectorReturn<TDestination>,
>(rawValue: TSelectorReturn): FromValueReturn<TSource, TDestination, TSelectorReturn>;