import type { ConditionPredicate, ConditionReturn, Dictionary, SelectorReturn } from '../types';
export declare function condition<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TSelectorReturn = SelectorReturn<TDestination>,
>(predicate: ConditionPredicate<TSource>, defaultValue?: TSelectorReturn): ConditionReturn<TSource, TDestination, TSelectorReturn>;