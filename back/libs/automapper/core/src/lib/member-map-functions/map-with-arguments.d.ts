import type { Dictionary, MapWithArgumentsReturn, Resolver, SelectorReturn } from '../types';
export declare function mapWithArguments<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TSelectorReturn = SelectorReturn<TDestination>,
>(
  withArgumentsResolver:
    | ((source: TSource, extraArguments: Record<string, unknown>) => TSelectorReturn)
    | Resolver<TSource, Record<string, unknown>, TSelectorReturn>,
): MapWithArgumentsReturn<TSource, TDestination, TSelectorReturn>;