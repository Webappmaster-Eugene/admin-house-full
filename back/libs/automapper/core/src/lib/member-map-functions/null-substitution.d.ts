import type { Dictionary, NullSubstitutionReturn, SelectorReturn } from '../types';
export declare function nullSubstitution<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TSelectorReturn = SelectorReturn<TDestination>,
>(substitution: TSelectorReturn): NullSubstitutionReturn<TSource, TDestination, TSelectorReturn>;